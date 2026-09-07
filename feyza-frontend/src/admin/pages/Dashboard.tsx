import { useAuth } from "@admin/contexts/AuthContext";
import ContentForm from "@admin/components/ContentForm";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-body font-bold">Bosh sahifa</h1>
        <p className="text-sm md:text-base text-foreground/70 mt-1">Xush kelibsiz, {user?.name || "Admin"}!</p>
      </div>

      <ContentForm />
    </div>
  );
}
