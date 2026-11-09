import type { Metadata } from "next";
import { ConfirmationView } from "@/features/consortium/components/ConfirmationView/ConfirmationView";

// Página só para quem acabou de enviar o pedido: não deve aparecer no Google.
export const metadata: Metadata = {
  title: "Pedido recebido | Círio & Barcellos",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return <ConfirmationView />;
}
