const { Users, Weight, Food, Water } = require('../../models');
const { nutrientsTotalPerDay, asyncHandler } = require('../../utils');

const weight = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const user = req.user;
    const owner = String(_id);

    const currentDate = req.body.date || new Date();
    const newWeight = req.body.weight;

    await Users.findByIdAndUpdate(_id, { weight: newWeight }, { new: true });

    const beginDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    beginDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const currentUserAndDay = await Weight.findOne({ owner, date: { $gte: beginDate, $lte: endDate } });

    let updatedUserAndDay = null;
    if (!currentUserAndDay) {
        updatedUserAndDay = await Weight.create({ date: currentDate, weight: newWeight, owner });
    } else {
        updatedUserAndDay = await Weight.findByIdAndUpdate(currentUserAndDay._id, { weight: newWeight }, { new: true });
    }

    // Розрахунок даних, які змінюються при оновленні цілі - для відображення змін в інтерфейсі
    const foodData = await Food.findOne({ owner, date: { $gte: beginDate, $lte: endDate } });
    const waterData = await Water.findOne({ owner, date: { $gte: beginDate, $lte: endDate } });
    const total = nutrientsTotalPerDay(user, waterData, foodData);

    res.status(200).json({
        weight: updatedUserAndDay.weight,
        total,
    });
});

module.exports = { weight };
