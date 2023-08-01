
export interface userData {
    _id: string;
    username: string;
    isblocked: boolean;
  }

  export  interface ownerData {
    _id : string,
     ownername : string,
     isblocked : boolean
   }

   export interface confirmation{
    isOpen : boolean,
    onCancel : ()=>void
    onConfirm : ()=> void
   }