import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  CafeTemplate, 
  GymTemplate, 
  SalonTemplate, 
  ServicesTemplate, 
  GeneralTemplate,
  ArchitectureTemplate,
  BoutiqueTemplate
} from "@/components/demo/Templates";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Fetch lead data from Supabase
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !lead) {
    return notFound();
  }

  // Render template based on category
  const category = lead.category;
  const industry = (lead.industry || "").toLowerCase();

  // Route design and architecture businesses to the premium ArchitectureTemplate
  if (
    category === "architecture" || 
    industry.includes("architect") || 
    industry.includes("interior") || 
    industry.includes("design") ||
    industry.includes("construction") ||
    industry.includes("builder")
  ) {
    return <ArchitectureTemplate lead={lead} />;
  }

  // Route fashion, clothing, apparel, boutique to BoutiqueTemplate
  if (
    category === "boutique" ||
    industry.includes("boutique") ||
    industry.includes("fashion") ||
    industry.includes("clothing") ||
    industry.includes("apparel")
  ) {
    return <BoutiqueTemplate lead={lead} />;
  }

  switch (category) {
    case "cafe":
      return <CafeTemplate lead={lead} />;
    case "gym":
      return <GymTemplate lead={lead} />;
    case "salon":
      return <SalonTemplate lead={lead} />;
    case "services":
      return <ServicesTemplate lead={lead} />;
    default:
      return <GeneralTemplate lead={lead} />;
  }
}

