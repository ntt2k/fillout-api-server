import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

type FilterClauseType = {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
};

app.get("/:formId/filteredResponses", async (req: Request, res: Response) => {
  const { formId } = req.params;
  const offset = parseInt(req.query.offset as string) || 0;
  const limit = parseInt(req.query.limit as string) || 150;
  const filters = req.query.filters;

  try {
    const filterParams: FilterClauseType[] = filters
      ? JSON.parse(filters as string)
      : [];
    const apiResponse = await axios.get(
      `https://api.fillout.com/v1/api/forms/${formId}/submissions`,
      {
        headers: { Authorization: `Bearer ${process.env.API_KEY}` }
        // params: { offset, limit }
      }
    );
    const responses = apiResponse.data.responses;

    // Apply filters to responses
    const filteredResponses = responses
      .filter((response: any) =>
        filterParams.every((filter: FilterClauseType) => {
          const question = response.questions.find(
            (q: any) => q.id === filter.id
          );
          if (!question) return false;

          switch (filter.condition) {
            case "equals":
              return question.value === filter.value;
            case "does_not_equal":
              return question.value !== filter.value;
            case "greater_than": {
              if (question.type === "DatePicker") {
                return new Date(question.value) > new Date(filter.value);
              } else if (question.type === "NumberInput") {
                return Number(question.value) > Number(filter.value);
              } else {
                return question.value > filter.value;
              }
            }
            case "less_than": {
              if (question.type === "DatePicker") {
                return new Date(question.value) < new Date(filter.value);
              } else if (question.type === "NumberInput") {
                return Number(question.value) < Number(filter.value);
              } else {
                return question.value < filter.value;
              }
            }
            default:
              return false;
          }
        })
      )
      .slice(offset, offset + limit);

    res.json({
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
      pageCount: Math.ceil(filteredResponses.length / limit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
