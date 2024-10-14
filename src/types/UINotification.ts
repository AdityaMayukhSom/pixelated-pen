export type UINotification = {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
};
