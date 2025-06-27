import { format } from "date-fns";



export default function formatDate(date: string) {
    let data = format(new Date(date), "dd/MM/yyyy");
    return data;
  }




