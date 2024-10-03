/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";

const useUser = (id: any) => {
   return useSWR(id && `http://localhost:3001/api/user/${id}`) 
};

export default useUser;