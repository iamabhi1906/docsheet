import { AuthUser } from "@/services/auth";

export interface makeRequestProps {
  user: AuthUser;
  documentId: string;
  requestType: "edit" | "view" | "both";
}
