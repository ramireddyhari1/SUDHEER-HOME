import { Container } from "@/components/ui/Container";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Priya S.",
        role: "Mother of two",
        text: "Finally found jaggery that tastes like my grandmother's home. The purity is unmatched!",
        rating: 5,
    },
    {
        name: "Ramesh K.",
        role: "Yoga Instructor",
        text: "The black rice is excellent. I've recommended Vaishnavi Organics to all my students.",
        rating: 5,
    },
    {
        name: "Anitha M.",
        role: "Home Chef",
        text: "Chemical-free ingredients make such a difference in taste. Highly trustworthy brand.",
        rating: 5,
    },
];

export function Testimonials() {
    return (
        <section className="py-8 md:py-20 bg-[#FDFBF7]">
            <Container>
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Family Favorites</h2>
                    <p className="text-muted-foreground">Hear from our community of happy families</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-secondary/10 hover:shadow-md transition-shadow">
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-foreground/80 leading-relaxed mb-6 italic">
                                "{t.text}"
                            </p>
                            <div>
                                <div className="font-bold text-lg font-serif">{t.name}</div>
                                <div className="text-sm text-muted-foreground">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
