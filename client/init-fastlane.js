async function initFastlane() {
  try {
    /**
     * Step 2.1 - Initialize Fastlane
     *
     * Replace the code in the section below
     */

    if (!window.paypal.Fastlane) {
      throw new Error("PayPal script loaded but no Fastlane module");
    }
    
    const {
      identity,
      profile,
      FastlanePaymentComponent,
      FastlaneWatermarkComponent,
    } = await window.paypal.Fastlane({
      // shippingAddressOptions: {
      //   allowedLocations: ['US:TX', 'US:CA', 'MX', 'CA:AB', 'CA:ON'],
      // },
      // cardOptions: {
      //   allowedBrands: ['VISA', 'MASTER_CARD'],
      // },
      styles: { root: { backgroundColor: "#faf8f5" } },
    });
    
    const paymentComponent = await FastlanePaymentComponent();
    
    const watermarkComponent = await FastlaneWatermarkComponent({
      includeAdditionalInfo: true,
    });

    /** End of Step 2.1 */

    /**
     * Step 3 - Add watermark
     *
     * Paste the code below
     */
    watermarkComponent.render("#watermark-container");

    const form = document.querySelector("form");
    const customerSection = document.getElementById("customer");
    const emailSubmitButton = document.getElementById("email-submit-button");
    const paymentSection = document.getElementById("payment");
    const checkoutButton = document.getElementById("checkout-button");

    let activeSection = customerSection;
    let memberAuthenticatedSuccessfully;
    let email;
    let shippingAddress;
    let paymentToken;

    const setActiveSection = (section) => {
      activeSection.classList.remove("active");
      section.classList.add("active", "visited");
      activeSection = section;
    };

    const getAddressSummary = ({
      address: {
        addressLine1,
        addressLine2,
        adminArea2,
        adminArea1,
        postalCode,
        countryCode,
      } = {},
      name: { firstName, lastName, fullName } = {},
      phoneNumber: { countryCode: telCountryCode, nationalNumber } = {},
    }) => {
      const isNotEmpty = (field) => !!field;
      const summary = [
        fullName || [firstName, lastName].filter(isNotEmpty).join(" "),
        [addressLine1, addressLine2].filter(isNotEmpty).join(", "),
        [
          adminArea2,
          [adminArea1, postalCode].filter(isNotEmpty).join(" "),
          countryCode,
        ]
          .filter(isNotEmpty)
          .join(", "),
        [telCountryCode, nationalNumber].filter(isNotEmpty).join(""),
      ];
      return summary.filter(isNotEmpty).join("\n");
    };

    emailSubmitButton.addEventListener("click", async () => {
      emailSubmitButton.setAttribute("disabled", "");
      email = form.elements["email"].value;
      form.reset();
      document.getElementById("email-input").value = email;
      paymentSection.classList.remove("visited", "pinned");

      /**
       * Step 2.3 - Call render function
       *
       * Paste the code in the line below
       */
      paymentComponent.render("#payment-component");


      memberAuthenticatedSuccessfully = undefined;
      shippingAddress = undefined;
      paymentToken = undefined;

      try {
        const { customerContextId } = await identity.lookupCustomerByEmail(email);
      
        if (customerContextId) {
          const authResponse = await identity.triggerAuthenticationFlow(
            customerContextId
          );
          console.log("Auth response:", authResponse);
      
          if (authResponse?.authenticationState === "succeeded") {
            memberAuthenticatedSuccessfully = true;
            name = authResponse.profileData.name;
            shippingAddress = authResponse.profileData.shippingAddress;
            paymentToken = authResponse.profileData.card;
          }
        } else {
          console.log("No customerContextId");
        }
      
        customerSection.querySelector(".summary").innerText = email;
      
        if (memberAuthenticatedSuccessfully) {
          paymentSection.classList.add('pinned');
        }
      
        setActiveSection(paymentSection);
      } finally {
        emailSubmitButton.removeAttribute("disabled");
      }
    });

    emailSubmitButton.removeAttribute("disabled");

    document
      .getElementById("email-edit-button")
      .addEventListener("click", () => setActiveSection(customerSection));

    document
      .getElementById("payment-edit-button")
      .addEventListener("click", () => setActiveSection(paymentSection));

    checkoutButton.addEventListener("click", async () => {
      checkoutButton.setAttribute("disabled", "");

      try {
        paymentToken = await paymentComponent.getPaymentToken();
        console.log("Payment token:", paymentToken);

        const body = JSON.stringify({ paymentToken });

        const response = await fetch("transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const { result, error } = await response.json();

        if (error) {
          console.error(error);
        } else {
          if (result.id) {
            const message = `Order ${result.id}: ${result.status}`;
            console.log(message);
            window.location.replace("/success");
          } else {
            console.error(result);
          }
        }
      } finally {
        checkoutButton.removeAttribute("disabled");
      }
    });
  } catch (error) {
    console.error(error);
  }
}

initFastlane();