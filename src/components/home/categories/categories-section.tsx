import { CategoryCarousel } from "@/components/home/categories/category-carousel";
import { Container } from "@/components/layout/container";
import { genres } from "@/data/genres";

export function CategoriesSection() {
  return (
    <section id="categories">
      <Container>
        <CategoryCarousel genres={genres} />
      </Container>
    </section>
  );
}
