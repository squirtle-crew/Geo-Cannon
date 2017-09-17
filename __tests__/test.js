"use strict";

var Nightmare = require("nightmare");

describe("Geo-Cannon", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages
  var login1 = ".signInNav";
  var login2 = ".signIn";

  it("should require me to login", function(done) {
    // ID for the login button.
    return Nightmare({
        show: true
      })
      .goto("https://lit-dusk-87215.herokuapp.com/")
      // Just to be safe.d
      .wait(login1)
      // Click the login button.
      .click(login1)
      // Evaluate the title
      .wait("#username")
      .type ("#username", "test")
      .type("#password", "test")
      .click(login2)
      .evaluate(function() {
        return document.title;
      })
      .end()
      // Asset the title is as expected
      .then(function(title) {
        expect(title).toEqual("GeoCannon Location");
        done();
      })
      // Catch errors
      .catch(function(err) {
        console.log(err);
        done();
      });
  }, 30000);

  // it("should present a link to course catalog after login", function(done) {
  //   return Nightmare({
  //       show: true,
  //       executionTimeout: 30000
  //     })
      // Visit login page
  //     .goto("https://lit-dusk-87215.herokuapp.com/")
  //     // Enter username.
  //     .type("#user_login", "ResilD")
  //     // Enter password.
  //     .type("#user_password", "dummy*password")
  //     // Take a screenshot of the login form.
  //     .screenshot("login.png")
  //     // Click login button. Always check if you've done this where necessary!
  //     // It's easy to forget.
  //     .click("#user_submit")
  //     // Click course catalog link.
  //     .evaluate(function() {
  //       return document.querySelector("a[href='/learn']");
  //     })
  //     .end()
  //     // Execute commands
  //     .then(function(result) {
  //       expect(result).toBeDefined();
  //       done();
  //     })
  //     // Catch errors
  //     .catch(function(err) {
  //       console.log(err);
  //       done();
  //     });
  // }, 30000);
});