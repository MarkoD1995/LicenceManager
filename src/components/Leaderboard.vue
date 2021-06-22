<template>
  <div class="container">
    <h1 class="mt-4 text-center">Licence Manager</h1>
    <form @submit.prevent="addUsersToLicence">
      <div class="form-group">
        <label for="user">How many new users do you want to add?</label>
        <input
          id="user"
          name="user"
          type="number"
          min="0"
          placeholder="Ex: 5"
          v-model="numberofAddedCustomers"
          class="form-control"
        />
        <label for="number">Enter Business ID:</label>
        <input
          id="business"
          name="business"
          type="number"
          placeholder="Ex: 111"
          v-model="businessInput"
          class="form-control"
        />
      </div>
      <div>
        <button class="btn btn-dark">
          Add new users for Licence
        </button>
      </div>
    </form>
    <h3 class="mt-4 text-left">Licence View</h3>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Licence ID</th>
          <th scope="col">Business ID</th>
          <th scope="col">Licence Type</th>
          <th scope="col">Customers Allowed</th>
          <th scope="col">Customers Spent</th>
          <th scope="col">Activation Date</th>
          <th scope="col">Expiration Date</th>
          <th scope="col">Status</th>
          <th scope="col">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, key) in licence" :key="key">
          <td>{{ entry.licenceId }}</td>
          <td>{{ entry.businessId }}</td>
          <td>{{ entry.licenceType }}</td>
          <td>{{ entry.numberOfCustomersAllowed }}</td>
          <td>{{ entry.numberOfCustomersSpent }}</td>
          <td>{{ entry.activationDate }}</td>
          <td>{{ entry.expirationDate }}</td>
          <td>{{ entry.status }}</td>
          <td>{{ entry.totalAmount }} EUR</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mt-4 text-left">Business View</h3>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Business ID</th>
          <th scope="col">Business Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, key) in business" :key="key">
          <td>{{ entry.businessId }}</td>
          <td>{{ entry.businessName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as moment from "moment/moment";
const licTypes = Object.freeze({
  TIME_BASED: "TIME BASED",
  NUMBER_BASED: "NUMBER BASED",
});
const licStatuses = Object.freeze({
  ACTIVE: "ACITVE",
  EXPIRED: "EXPIRED",
  OVERDRAFT: "OVERDRAFT",
  INACTIVE: "INACTIVE",
});

export default {
  name: "LeaderBoard",
  data() {
    return {
      numberofAddedCustomers: null,
      businessInput: null,

      licence: [
        {
          licenceId: 1,
          licenceType: licTypes.TIME_BASED,
          numberOfCustomersAllowed: 10,
          numberOfCustomersSpent: 0,
          activationDate: "",
          expirationDate: "",
          totalAmount: 0,
          status: licStatuses.INACTIVE,
          businessId: 9445,
        },
        {
          licenceId: 2,
          licenceType: licTypes.NUMBER_BASED,
          numberOfCustomersAllowed: 10,
          numberOfCustomersSpent: 0,
          activationDate: "/",
          expirationDate: "/",
          totalAmount: 0,
          status: licStatuses.INACTIVE,
          businessId: 8475,
        },
      ],

      business: [
        {
          businessId: 9445,
          businessName: "IT Academy",
        },
        {
          businessId: 8475,
          businessName: "World Bank",
        },
      ],
    };
  },

  methods: {
    addUsersToLicence() {
      // finds selected licence which is in coherence with business id provided via input on form.
      let selectedLicence = this.licence.find((d) => {
        return d.businessId == this.businessInput;
      });

      // validates input
      if (selectedLicence == null) {
        alert("Enter correct business ID");
        return;
      }

      // checks if selected licence is time based and inactive, and sets dates for first customer.
      if (
        selectedLicence.licenceType == licTypes.TIME_BASED &&
        selectedLicence.status == licStatuses.INACTIVE
      ) {
        selectedLicence.activationDate = moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        );
        selectedLicence.expirationDate = moment()
          .add(1, "Y")
          .format("MMMM Do YYYY, h:mm:ss a");
      }

      for (let i = 0; i < this.numberofAddedCustomers; i++) {
        if (selectedLicence.status == licStatuses.INACTIVE) {
          selectedLicence.status = licStatuses.ACTIVE;
        }

        selectedLicence.numberOfCustomersAllowed -= 1;
        selectedLicence.numberOfCustomersSpent += 1;

        // checks if amount is greater than added users
        if (selectedLicence.numberOfCustomersAllowed < 0) {
          selectedLicence.status = licStatuses.OVERDRAFT;
          selectedLicence.totalAmount += 2;
          // checks if Licence is expired in TIME_BASED Licence type
        } else if (
          selectedLicence.licenceType == licTypes.TIME_BASED &&
          moment().format("MMMM Do YYYY, h:mm:ss a") >
            selectedLicence.expirationDate
        ) {
          selectedLicence.status = licStatuses.EXPIRED;
          selectedLicence.totalAmount += 2;
        } else {
          selectedLicence.totalAmount += 1;
        }
      }
    },
  },
};
</script>
