const { Water } = require('../../models');
const { asyncHandler } = require('../../utils');

const waterIntake = asyncHandler(async (req, res) => {
    const { _id: owner } = req.user;
    const currentDate = req.body.date || Date.now();
    const newWater = req.body.water;

    const beginDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    beginDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const currentUserAndDay = await Water.findOne({ owner, date: { $gte: beginDate, $lte: endDate } });
    let savedUserAndDay = null;

    if (!currentUserAndDay) {
        savedUserAndDay = await Water.create({ date: currentDate, water: newWater, owner });
    } else {
        const currentWaterIntake = currentUserAndDay.water;
        const updatedWaterIntake = currentWaterIntake + newWater;
        savedUserAndDay = await Water.findByIdAndUpdate(currentUserAndDay._id, { water: updatedWaterIntake }, { new: true });
    }

    res.status(200).json({
        addedWater: newWater,
        totalWater: savedUserAndDay.water,
    });
});

module.exports = { waterIntake: asyncHandler(waterIntake) };
