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
function Address(emailAddress, physicalAddress, emailType, addressType) {
this.emailAddress = emailAddress;
this.physicalAddress = physicalAddress;
this.emailType = emailType;
this.addressType = addressType;
};

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
  $(".email-address").html(contact.Address.emailAddress + " <b>Type:</b> " + contact.Address.emailType);
  $(".physical-address").html(contact.Address.physicalAddress + " <b>Type:</b> " + contact.Address.addressType);
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
  var emailGroup = $("#email-group")
  var physicalGroup = $("#physical-group")
  $("#email-group").on("click", "button", function() {
    emailGroup.append('<br> <label for="email2">Email:</label>' + '<input type="text" class="form-control" id="email2">')
    emailGroup.append('<label for="email-type">Type:</label>' + '<select class="form-control, type-group" id="email-type1"> <option value="Personal">Personal</option> <option value="Work">Work</option> </select>')
    $("#another-email").detach();
  });
  $("#physical-group").on("click", "button", function () {
    console.log("Get pills against my orders! Get moving!")
    emailGroup.append('<br> <label for="address2">Address:</label>' + '<input type="text" class="form-control" id="address2">')
    physicalGroup.append('<label for="address-type">Type:</label>' + '<select class="form-control, type-group" id="address-type1"> <option value="Personal">Personal</option> <option value="Work">Work</option> </select>')
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
    var emailType0 = $("#email-type0").val();
    var addressType0 = $("#address-type0").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-physical-address").val("");
    $("#email-type0").val("");
    $("#address-type0").val("");
    console.log(addressType0);
    var newContactAddress = new Address (inputtedEmailAddress, inputtedPhysicalAddress, emailType0, addressType0)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newContactAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);

  });
});
