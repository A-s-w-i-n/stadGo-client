import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { stadim } from "../../domain/modals/stadium";
import { useNavigate } from "react-router-dom";
// import { paypalProps } from '../../domain/modals/paypal'
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import api from "../../servises/api/axios interceptor ";


const Paypal: React.FC = () => {
  console.log(import.meta.env.VITE_PAYPAL_SECRETE )
  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer />
      <PayPalScriptProvider
        options={{
          clientId:import.meta.env.VITE_PAYPAL_SECRETE  as string
        }}
      >
        <PayPalButtons
          style={{
            layout: "horizontal",
            color: "white",
            label: "buynow",
            height: 40,
          }}
          className="my-3 mx-2"
          createOrder={(_data: any, action: any) => {
            return action.order.create({
              purchase_units: [
                {
                  amount: {
                    value: 200,
                  },
                },
              ],
            });
          }}
          onApprove={(_data: any, actions: any) => {
            console.log("order=", actions.order);

            return actions.order
              .capture()
              .then(async function () {
                const emailId = JSON.parse(
                  localStorage.getItem("owner") as string
                );
                const email = emailId.email;

                const update = await api.post("/owner/ownerPremium", { email });
                if (update) {
                  navigate("/stadiumDetails");

                  toast.success("stadium added successfully", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                }
              })
              .catch(function (error: any) {
                toast.success(error as string, {
                  position: "top-right",
                  autoClose: 3000,
                });
              });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;
