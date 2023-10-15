var express = require('express');
var router = express.Router();

const {connectToDB, ObjectId} = require('../u/db');

/* GET home page. */
router.get('/', async function (req, res) {
    const db = await connectToDB();
    let result = await db.collection("events").find().sort({_id: -1}).limit(6).toArray();
    let result2 = await db.collection("events").find().sort({_id: -1}).limit(6).toArray();

    function compareNumbers(a, b) {//in non-descending order
        let Timea = a.modifiedAt;
        let Timeb = b.modifiedAt;
        if (Timea < Timeb) {
            return -1;
        }
        if (Timea > Timeb) {
            return 1;
        }
        // names must be equal
        return 0;
    }

    function compareNumbers2(a, b) {//in non-descending order
        let Timea = a.Highlight;
        let Timeb = b.Highlight;
        if (Timea && !Timeb) {
            return -1;
        }
        if (!Timea && Timeb) {
            return 1;
        }
        // names must be equal
        return 0;
    }

    result.sort(compareNumbers);
    result2.sort(compareNumbers2);
    res.render('home', {events: result, now_date: new Date(), highlight: result2});
});

router.get('/become/volunteer', function (req, res) {
    res.render('volunteer');
});

router.post('/becoming', async function (req, res) {
    const db = await connectToDB();
    try {
        req.body.createdAt = new Date();
        req.body.modifiedAt = new Date();

        let result = await db.collection("volunteer").insertOne(req.body);
        if (result) {
            res.render('ToHome', {text: "Registered successfully"});
        } else {
            res.render('ToHome', {text: "Register failed"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    } finally {
        await db.client.close();
    }
});

router.get('/event', async function (req, res) {
    const db = await connectToDB();
    let page = parseInt(req.query.page) || 1;
    let total = await db.collection("events").countDocuments();
    let skip = (page - 1) * 6;
    let result = await db.collection("events").find().sort({_id: -1}).skip(skip).limit(6).toArray();

    function compareNumbers(a, b) {//in non-descending order
        let Timea = a.Highlight;
        let Timeb = b.Highlight;
        if (Timea && !Timeb) {
            return -1;
        }
        if (!Timea && Timeb) {
            return 1;
        }
        // names must be equal
        return 0;
    }

    result.sort(compareNumbers)
    let events_one = [];
    for (let i = 0; i < 6; i++) {
        if (result[i]) {
            events_one[i] = result[i];
        }
    }
    res.render('event', {
        page: page, total: total, events_one: events_one, now_date: new Date()
    });
});

router.get('/event/new', function (req, res) {
    let page = 5;
    let total = 20
    res.render('new');
});

router.post('/upload_event', async function (req, res) {
    const db = await connectToDB();
    try {
        if (req.body.Highlight === "on") {
            req.body.Highlight = true;
        } else {
            req.body.Highlight = false;
        }
        req.body.createdAt = new Date();
        req.body.modifiedAt = new Date();
        let result = await db.collection("events").insertOne(req.body);
        if (result) {
            res.render('ToHome', {text: "Event uploaded successfully"});
        } else {
            res.render('ToHome', {text: "Event uploaded failed"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    } finally {
        await db.client.close();
    }
});

router.get('/event/detail/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("events").findOne({_id: new ObjectId(req.params.id)});
        console.log(result.Title);
        if (result) {
            res.render('detail', {information: result});
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    } finally {
        await db.client.close();
    }
});

router.get('/event/edit/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("events").findOne({_id: new ObjectId(req.params.id)});
        console.log(result.Highlight);
        if (result) {
            res.render('edit', {information: result});
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    } finally {
        await db.client.close();
    }
});

router.post('/event/edit/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        if (req.body.Highlight === "on") {
            req.body.Highlight = true;
        } else {
            req.body.Highlight = false;
        }
        req.body.modifiedAt = new Date();
        let result = await db.collection("events").updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body});
        if (result) {
            res.render('ToHome', {text: "Event edited successfully"});
        } else {
            res.render('ToHome', {text: "Event edit failed"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    } finally {
        await db.client.close();
    }
});
router.post('/event/delete_event/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("events").deleteOne({_id: new ObjectId(req.params.id)});
        if (result) {
            res.render('ToHome', {text: "Event deleted successfully"});
        } else {
            res.render('ToHome', {text: "Event delete failed"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    } finally {
        await db.client.close();
    }
});
////////////////////////////////////////////////////////


/* Display a single Booking */
router.get('bookings/single/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("bookings").findOne({_id: new ObjectId(req.params.id)});
        if (result) {
            res.render('single', {tt: result});
        } else {
            res.status(404).json({message: "Booking not found"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    } finally {
        await db.client.close();
    }
});
//
// /* Display all Bookings */
// router.get('/bookings', async function (req, res) {
//   const db = await connectToDB();
//   try {
//     let results = await db.collection("bookings").find().toArray();
//     res.render('bookings', { bookings: results });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   } finally {
//     await db.client.close();
//   }
// });
// // // Delete a single Booking
// router.post('/bookings/delete/:id', async function (req, res) {
//   const db = await connectToDB();
//   try {
//     let result = await db.collection("bookings").deleteOne({ _id: new ObjectId(req.params.id) });
//     if (result.deletedCount > 0) {
//       res.status(200).json({ message: "Booking deleted" });
//     } else {
//       res.status(404).json({ message: "Booking not found" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   } finally {
//     await db.client.close();
//   }
// });
// // display the update form
// router.get('/bookings/update/:id', async function (req, res) {
//   const db = await connectToDB();
//   try {
//     let result = await db.collection("bookings").findOne({ _id: new ObjectId(req.params.id) });
//     if (result) {
//       res.render('update', { booking: result });
//     } else {
//       res.status(404).json({ message: "Booking not found" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   } finally {
//     await db.client.close();
//   }
// });
//
// // Update a single Booking
// router.post('/bookings/update/:id', async function (req, res) {
//   const db = await connectToDB();
//   try {
//     req.body.TicketsNumber = parseInt(req.body.TicketsNumber);
//     req.body.terms = req.body.terms == "on";
//     req.body.superhero = req.body.superhero || "";
//     req.body.modifiedAt = new Date();
//     let result = await db.collection("bookings").updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
//
//     if (result.modifiedCount > 0) {
//       res.status(200).json({ message: "Booking updated" });
//     } else {
//       res.status(404).json({ message: "Booking not found" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   } finally {
//     await db.client.close();
//   }
// });
//
// // Search Bookings
// router.get('/bookings/search', async function (req, res) {
//   const db = await connectToDB();
//   try {
//     let query = {};
//     if (req.query.email) {
//       query.email = req.query.email;
//     }
//     if (req.query.TicketsNumber) {
//       query.TicketsNumber = parseInt(req.query.TicketsNumber);
//     }
//
//     let result = await db.collection("bookings").find(query).toArray();
//     res.render('bookings', { bookings: result });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   } finally {
//     await db.client.close();
//   }
// });

// Pagination based on query parameters page and limit, also returns total number of documents
// router.get('/bookings/paginate', async function (req, res) {
//   const db = await connectToDB();
//   try {
//     let page = parseInt(req.query.page) || 1;
//     let perPage = parseInt(req.query.perPage) || 10;
//     let skip = (page - 1) * perPage;
//
//     let result = await db.collection("bookings").find().skip(skip).limit(perPage).toArray();
//     let total = await db.collection("bookings").countDocuments();
//
//     res.render('paginate', { bookings: result, total: total, page: page, perPage: perPage });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
//   finally {
//     await db.client.close();
//   }
// });
module.exports = router;
