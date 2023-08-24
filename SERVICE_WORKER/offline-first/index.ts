import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

// The default quotations. `makeDefaults()` simply add the id and the
// sticky flag to make them non removables.
let defaultQuotations = makeDefaults([
  {
    text:
      "Humanity is smart. Sometime in the technology world we think we " +
      "are smarter, but we are not smarter than you.",
    author: "Mitchell Baker",
  },
  {
    text:
      "A computer would deserve to be called intelligent if it could " +
      "deceive a human into believing that it was human.",
    author: "Alan Turing",
  },
  {
    text: "If you optimize everything, you will always be unhappy.",
    author: "Donald Knuth",
  },
  {
    text:
      "If you don't fail at least 90 percent of the time, you're not " +
      "aiming high enough",
    author: "Alan Kay",
  },
  {
    text: "Colorless green ideas sleep furiously.",
    author: "Noam Chomsky",
  },
]);

// Simple session handling with a hash of sessions.
let sessions: Record<string, any> = {};

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

// Returns an array with all quotations.
app.get("/api/quotations", function (req, res) {
  var quotations = getQuotationsForSession(req.query.session as string);
  res.json(
    quotations.filter(function (item) {
      return item !== null;
    })
  );
});

// Delete a quote specified by id. The id is the position in the collection
// of quotations (the position is 1 based instead of 0).
app.delete("/api/quotations/:id", function (req, res) {
  var quotations = getQuotationsForSession(req.query.session as string);
  var id = parseInt(req.params.id, 10) - 1;
  if (!quotations[id]?.isSticky) {
    quotations[id] = null;
  }
  res.sendStatus(204);
});

// Add a new quote to the collection.
app.post("/api/quotations", function (req, res) {
  var quotations = getQuotationsForSession(req.query.session as string);
  var quote = req.body;
  quote.id = quotations.length + 1;
  quotations.push(quote);
  res.status(201).json(quote);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

interface Quota {
  text: string;
  author: string;
  id: number;
  isSticky: boolean;
}

// Adds id and the sticky flag to a list of quotes.
function makeDefaults(
  quotationList: Array<Pick<Quota, "author" | "text">>
): Quota[] {
  return quotationList.map((item, index) => ({
    ...item,
    id: index + 1,
    isSticky: true,
  }));
}

// Get the quotation collection for a session
function getQuotationsForSession(session: string) {
  if (!(session in sessions)) {
    sessions[session] = JSON.parse(JSON.stringify(defaultQuotations));
  }
  return sessions[session] as Array<Quota | null>;
}
