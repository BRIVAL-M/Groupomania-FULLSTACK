const rateLimit = require("express-rate-limit");
// Use RateLimit middleware in order to limit the number of request per IP "BRUTE FORCE"

const limiter = rateLimit({

    windowMs:15* 60 * 1000,  
    max: 1500000,  // Limite chaque IP à 15 requêtes par `window` 
    standardHeaders: true,  // Return rate limit info dans les en-têtes `RateLimit-*` 
    legacyHeaders: false,  // Désactive les en-têtes `X-RateLimit-*`

    handler: (req, res, next) => {
        res.setHeader("Retry-After", 15);
        res.status(429).send("Too Many Requests");
       }
});


module.exports = limiter;