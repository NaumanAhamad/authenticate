const bcrypt = require('bcryptjs');

var password = 'nauman9@1993';

bcrypt.genSalt(15, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

const hashedPassword = '$2a$10$5fWrYbsPlsmtFwc0Esyd0.YaXhDaxU2DzFe2a7sDVJI4.F6Yr8Mky';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
