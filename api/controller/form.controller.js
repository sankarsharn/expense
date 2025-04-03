import Form from "../model/form.model.js";
import { errorHandler } from "../utils/errorHandler.js"; // Ensure you have this utility for error handling

export const createForm = async (req, res, next) => {
  const { amount, category, description, date, tracker } = req.body;
  const userId = req.user.id;
  // Validate required fields
  if (
    !amount ||
    amount.trim() === "" ||
    !category ||
    category.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !date
  ) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }

  // Validate date
  const expenseDate = new Date(date);
  if (isNaN(expenseDate.getTime())) {
    return next(errorHandler(400, "Invalid date"));
  }

  try {
    // Create the expense entry
    const expenseEntry = { amount, description, date: expenseDate };

    // Initialize the new form object
    const newForm = new Form({
      userId,
      amount,
      category,
      description,
      date: expenseDate,
      tracker: tracker || false,
    });

    await newForm.save();

    res.status(201).json({ message: "Form submitted successfully", newForm });
  } catch (error) {
    console.error("Error creating form:", error);
    return next(error);
  }
};

export const getAllDetails = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  if (!startDate || !endDate) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }

  try {
    const expenses = await Form.find({
      // mongoDB aggregation pipeline
      userId,
      date: {
        $gte: new Date(startDate), // gte -> get greater than or equal to the start date
        $lte: new Date(endDate),
      }, // lte -> get less than or equal to the end date
    }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
};

export const categoryWiseExpenseTotal = async (req, res, next) => {
  const { startDate, endDate, category } = req.body;

  if (!startDate || !endDate) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }

  try {
    let matchStage = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    if (category) {
      matchStage.category = category;
    }

    const categoryTotals = await Form.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const detailedExpenses = await Form.find(matchStage).select("amount date category description");

    res.status(200).json({ categoryTotals, detailedExpenses });
  } catch (error) {
    return next(error);
  }
};

export const deleteForm = async (req, res, next) => {
  const formId = req.params.formId;
  
  if(!formId) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }

  try {
    await Form.findByIdAndDelete(formId);
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    return next(error);
  }
}

export const updateForm = async (req, res, next) => {
  const formId = req.params.formId;
  if(!formId) {
    return next(errorHandler(400, "Please fill all the required fields"));
  }
  const { amount, category, description, date, tracker } = req.body;

  try {
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.formId,  
    {
      $set: {
        amount,
        category,
        description,
        date,
        tracker,
      },
    }, {new: true,})

    res.status(200).json({ message: "Form updated successfully", updatedForm });
  } catch (error) {
    return next(error);
  }
}