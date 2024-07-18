const Customer = require("../models/Customer");
const StreamType = require("../models/StreamType");
const CampaignBooking = require("../models/CampaignBooking");
const {random} = require("../helpers");

const getAllBookings = async () => {
    return await CampaignBooking.findAll();
};

const getByCustomer = async (customerId) => {
    return await CampaignBooking.findAll({
        where: {
            customerId,
        },
    });
};

const insertByCustomer = async ({customerId, streamTypes}, callback) => {
    // expected eg:
    // [
    //   {
    //     typeId: "",
    //     budget: 0,
    //   },
    //   {
    //     typeId: "",
    //     budget: 0,
    //   },
    //   {
    //     typeId: "",
    //     budget: 0,
    //   },
    // ];
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
        return callback({
            message: "Customer not found",
            status: 404,
        });
    }

    try {
        streamTypes = streamTypes.map((item) => {
            return {
                customerId,
                streamTypeId: item.typeId,
                budget: item.budget,
                budget_balance: item.budget,
            };
        });

        return callback(null, await CampaignBooking.bulkCreate(streamTypes));
    } catch (e) {
        return callback({
            message: e.errors,
            status: 500,
        });
    }
};

const runCampaign = async ({customerId}, callback) => {
    let bookings = await CampaignBooking.findAll({
        where: {
            customerId,
        },
    });

    const bookingCount = bookings.length;
    if (bookingCount == 0) {
        return callback({
            message: "No campaign bookings found for this customer.",
            status: 404,
        });
    }

    if (bookings.every((e) => e.budget_balance <= 0)) {
        return callback({
            message: "All campaign bookings have a balance of 0%",
            status: 400,
        });
    }

    let totalBudget = 0;
    let totalBudgetBalance = 0;
    let balancePercentage = [];
    bookings.forEach((e) => {
        totalBudget += e.budget;
        totalBudgetBalance += e.budget_balance;
        balancePercentage.push(e.budget_balance / e.budget);
    });

    const count = balancePercentage.filter(
        (percentage) => percentage < 0.05
    ).length;

    // if one of them have balance of less than 5%, re-balance
    if (count < bookingCount) {
        for (const item of bookings) {
            try {
                const result = await CampaignBooking.update(
                    {
                        budget_balance: totalBudgetBalance / bookingCount,
                    },
                    {
                        where: {
                            customerId,
                            streamTypeId: item.streamTypeId,
                        },
                    }
                );
                console.log(`Updated streamTypeId ${item.streamTypeId}:`, result);
            } catch (e) {
                console.error(`Error updating streamTypeId ${item.streamTypeId}:`, e);
            }
        }

        bookings = await CampaignBooking.findAll({
            where: {
                customerId,
            },
        });
    }

    // charge random campaign price for all
    for (const item of bookings) {
        const price = item.budget_balance - random(2000, 5000);
        try {
            const result = await CampaignBooking.update(
                {
                    budget_balance: price < 0 ? 0 : price,
                },
                {
                    where: {
                        customerId,
                        streamTypeId: item.streamTypeId,
                    },
                }
            );
            console.log(`Charged streamTypeId ${item.streamTypeId}:`, result);
        } catch (e) {
            console.error(`Error charging streamTypeId ${item.streamTypeId}:`, error);
        }
    }

    return callback(
        null,
        await CampaignBooking.findAll({
            where: {
                customerId,
            },
        })
    );
};

module.exports = {
    getAllBookings,
    getByCustomer,
    insertByCustomer,
    runCampaign,
};
