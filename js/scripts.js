// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();   // <--- This line is new!
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {     // <-- This line is new!
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }                          // <-- This line is also new!
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {     // <-- This line is new!
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }                          // <-- This line is also new!
  };
  return false;
}

// Business Logic for Contacts ---------
function Address() {
  this.emailAddresses = [];
  this.physicalAddresses = [];
  this.emailTypes = [];
  this.addressTypes = [];
};

Address.prototype.addAddress = function(emailAddress, physicalAddress, emailType, addressType) {
  this.emailAddresses.push(emailAddress);
  this.physicalAddresses.push(physicalAddress);
  this.emailTypes.push(emailType);
  this.addressTypes.push(addressType);
}

function Contact(firstName, lastName, phoneNumber, Address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.Address = Address;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};


//User interface
var addressBook = new AddressBook();
var address0 = new Address();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.Address.emailAddresses[0] + " <b>Type:</b> " + contact.Address.emailTypes[0]);
  $(".physical-address").html(contact.Address.physicalAddresses[0] + " <b>Type:</b> " + contact.Address.addressTypes[0]);
  $("#addAddresses").html('<button type="button" class="btn-primary" id="another-address">Add another address and email</button>')
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function addAnotherAddress() {
  $("#show-contact").on("click", "button#another-address", function () {
    console.log("Get pills against my orders! Get moving!")
    $("button#another-address").after('<form id="address2"> <div class="form-group, address-group"><label for="add-address">Add address:</label><input type="text" class="form-control" id="add-address">' + '  ' + '<label for="address-type2">Type:</label><select class="form-control, type-group" id="address-type2"><option value="Personal">Personal</option><option value="Work">Work</option></select></div><div class="form-group, address-group"><label for="add-email">Add email:</label><input type="text" class="form-control" id="add-email">' + '  ' + '<label for="email-type2">Type:</label><select class="form-control, type-group" id="email-type2"><option value="Personal">Personal</option><option value="Work">Work</option></select></div><button type="submit" class="btn-primary">Add address</button></form>')
    $("#another-address").detach();
  });
};

$(document).ready(function() {
  attachContactListeners();
  addAnotherAddress();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();
    var emailType = $("#email-type").val();
    var addressType = $("#address-type").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-physical-address").val("");
    $("#email-type0").val("");
    $("#address-type0").val("");
    address0.addAddress(inputtedEmailAddress, inputtedPhysicalAddress, emailType, addressType);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, address0);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
  $("form#address2").submit(function(event) {
    event.preventDefault();
    var secondEmail = $("input#add-address").val();
    var secondAddress = $("input#add-email").val();
    var addressType2 = $("address-type2").val();
    var emailType2 = $("email-type2").val();
    $("input#add-address").val("");
    $("input#add-email").val("");
    $("address-type2").val("");
    $("email-type2").val("");
    address0.addAddress(secondEmail, secondAddress, emailType2, addressType2);
    console.log(address0.length);
  });
});
