const fs = require("fs");
const uniqid = require("uniqid");
const path = require("path");
const uniqId = uniqid();

const contactsPath = path.resolve("./db/contacts.json");
const contactsPathTest = path.resolve("./db/contacts1.json");
console.log(contactsPath);
module.exports = { contactsPath };

function listContacts() {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error);
    }

    JSON.parse(data).map((contact) => {
      if (contactId === Number(contact.id)) {
        console.table(contact);
      }
    });
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error);
    }

    const contactsWithoutRemovedContact = JSON.parse(data).filter(
      (contact) => Number(contact.id) !== contactId
    );
    fs.writeFileSync(
      contactsPathTest,
      JSON.stringify(contactsWithoutRemovedContact),
      "utf8"
    );
    console.table(contactsWithoutRemovedContact);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error);
    }

    fs.writeFileSync(
      contactsPathTest,
      JSON.stringify(
        [...JSON.parse(data), { uniqId, name, email, phone }],
        "utf8"
      )
    );
    console.table([...JSON.parse(data), { uniqId, name, email, phone }]);
  });
}

module.exports = {
  contactsPath,
  contactsPathTest,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
