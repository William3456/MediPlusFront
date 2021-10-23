import { Estado } from "./estado";

export class Usuario {
  id: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
  remember: number = 0;
  status: Estado = {
    id: 0,
    description: ""
  };
  user_type?: number = 0;

}
