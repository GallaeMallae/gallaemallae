import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_MENU } from "@/lib/constants";

export default function CategoryMenu() {
  return (
    <section>
      <h3 className="text-title2 mb-2 font-bold">카테고리 검색</h3>

      <div className="flex justify-between md:grid md:grid-cols-5 md:gap-4">
        {CATEGORY_MENU.map((category) => {
          const { name, iconBgColor, Icon } = category;

          return (
            <Card
              key={`category-${name}`}
              className="cursor-pointer border-none bg-transparent py-0 shadow-none md:rounded-xl md:border md:bg-white md:py-6 md:shadow-sm"
            >
              <CardContent className="flex flex-col items-center gap-2 p-0">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl text-white md:h-12 md:w-12 md:rounded-full ${iconBgColor}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <span className="text-desc2 font-medium">{name}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
