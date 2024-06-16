const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const fetchContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const listContacts = async () => {
  const contacts = await fetchContacts();
  console.log(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await fetchContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log(contact);
  return contact;
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fetchContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Contact with id ${contactId} has been removed.`);
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fetchContacts();
    const id = contacts.length
      ? Math.max(...contacts.map((contact) => parseInt(contact.id))) + 1
      : 1;
    const newContact = { id, name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Contact "${name}" with id ${id} has been added.`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
