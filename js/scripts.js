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
  $(".email-address").html(contact.Address.emailAddress + " " + contact.Address.emailType);
  $(".physical-address").html(contact.Address.physicalAddress + " " + contact.Address.AddressType);
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

/*function addAnotherAddress() {
  var emailGroup = $("#email-group")
  var physicalGroup = $("#physical-group")
  $("button").on("click", "#another-email", function() {
    emailGroup.append("")
  });
};*/ //write this later, just get the two kinds working now!

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();
    var emailType0 = $("input#email-type0").val();
    var addressType0 = $("input#address-type0").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-physical-address").val("");
    $("input#email-type0").val("");
    $("input#address-type0").val("");
    console.log(addressType0);
    var newContactAddress = new Address (inputtedEmailAddress, inputtedPhysicalAddress, emailType0, addressType0)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newContactAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
