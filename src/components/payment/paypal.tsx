import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { stadim } from "../../domain/modals/stadium";
import { useNavigate } from "react-router-dom";
// import { paypalProps } from '../../domain/modals/paypal'
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import api from "../../servises/api/axios interceptor ";

//  interface paypalProps {

//     handleAddStadium : ()=>Promise<void>
// }

const Paypal: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer />
      <PayPalScriptProvider
        options={{
          clientId:
            "AWlpb_CM30pTBOOy0z1dhtq_aQ-41YZsyZBxiJfm1RVOynnAwFXVlx_0zQCL2iQg0R_BEfl8xn5cxzk0",
        }}
      >
        
        <PayPalButtons
    style={{ layout: "horizontal" }}
    className="  my-3"
    createOrder={(_data: any, action: any) => {
        return action.order.create({
            purchase_units: [
                {
                    amount: {
                        value: 1200,
                    },
                },
            ],
        });
    }}
    onApprove={(_data: any, actions: any) => {
        return actions.order
            .capture()
            .then(async function () {
                const emailId =JSON.parse( localStorage.getItem('owner')as string)
                const email = emailId.email
               
                
                const update =await api.post('/owner/ownerPremium',{email})
                if(update){
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
