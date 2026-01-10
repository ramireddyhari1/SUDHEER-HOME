import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const combos = [
    {
        id: "breakfast-combo",
        name: "Healthy Breakfast Combo",
        description: "Millet Mix + Jaggery Powder + Honey",
        price: 999,
        originalPrice: 1250,
        image: "https://images.unsplash.com/photo-1505253758473-96b701d2cd03?auto=format&fit=crop&q=80&w=600",
        bg: "bg-orange-50",
    },
    {
        id: "immunity-combo",
        name: "Immunity Booster Pack",
        description: "Turmeric + Black Pepper + Ginger Powder",
        price: 799,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=600",
        bg: "bg-green-50",
    },
];

export function ComboPacks() {
    return (
        <section className="py-16 bg-white">
            <Container>
                <div className="text-center mb-10">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold">Value Combos</h2>
                    <p className="text-muted-foreground">Perfectly curated for your wellness journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {combos.map((combo) => (
                        <div key={combo.id} className={`rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm border border-gray-100 ${combo.bg}`}>
                            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                                <Image src={combo.image} alt={combo.name} fill className="object-cover" />
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    SAVE ₹{combo.originalPrice - combo.price}
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2 flex flex-col justify-center gap-4">
                                <div>
                                    <h3 className="font-serif font-bold text-xl mb-1">{combo.name}</h3>
                                    <p className="text-sm text-foreground/70">{combo.description}</p>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold text-primary">₹{combo.price}</span>
                                    <span className="text-sm text-muted-foreground line-through mb-1">₹{combo.originalPrice}</span>
                                </div>
                                <Button className="w-full">Add Combo</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
