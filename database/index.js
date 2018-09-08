const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "supermed";

// Use connect method to connect to the server
MongoClient.connect(
  url,
  { useNewUrlParser: true },
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const doc = {
      active_ingredient: "ibuprofen",
      US_brands: [
        "Advil",
        "Motrin",
        "Midol",
        "Nurofen",
        "Nufren",
        "Caldolor",
        "NeoProfen"
      ],
      purpose: ["pain reliever", "fever reducer"],
      drug_class: "Nonsteroidal anti-inflammatory drug",
      availability: [
        {
          country: "China",
          translation: "布洛芬",
          brands: ["brand1", "brand2"]
        },
        {
          country: "France",
          translation: "Ibuprofène",
          brands: ["brand1", "brand2"]
        }
      ]
    };
    db.collection("drugs")
      .deleteMany({})
      .then(res => console.log("Document deleted"))
      .catch(err => console.error(error));

    db.createCollection("drugs", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
    });
    db.collection("drugs")
      .insertOne(doc)
      .then(res => console.log("Document inserted"))
      .catch(err => console.error(error));

    db.collection("drugs")
      .find({
        US_brands: searchtext
      })
      .toArray()
      .then(res => console.log(JSON.stringify(res[0].US_brands[0], null, 2)))
      .catch(err => console.error(error));
    client.close();
  }
);
