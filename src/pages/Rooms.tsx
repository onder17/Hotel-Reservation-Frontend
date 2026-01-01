// src/pages/Search.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { ChevronsUpDown, Check, CalendarIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { useSearchParams } from "react-router-dom";

type FormSchema = {
  city: string;
  from: Date | undefined;
  to: Date | undefined;
}

const countries = [
  {
    name: "Türkiye",
    cities: [
      {
        value: "istanbul",
        label: "İstanbul",
      },
      {
        value: "ankara",
        label: "Ankara",
      },
      {
        value: "izmir",
        label: "İzmir",
      },
    ]
  },
  {
    name: "İngiltere",
    cities: [
      {
        value: "london",
        label: "Londra",
      },
      {
        value: "manchester",
        label: "Manchester",
      },
      {
        value: "liverpool",
        label: "Liverpool",
      },
    ]
  },
]

type Hotel = {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
};

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Neon Star Luxury",
    city: "İstanbul, Türkiye",
    price: 3200,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Cyber Glow Hotel",
    city: "Berlin, Almanya",
    price: 2800,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Midnight Neon Resort",
    city: "Tokyo, Japonya",
    price: 4100,
    rating: 4.9,
  },
];

export default function Rooms() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const form = useForm<FormSchema>({
    defaultValues: {
      city: searchParams.get("city") ?? "",
      from: checkIn ? new Date(checkIn) : undefined,
      to: checkOut ? new Date(checkOut) : undefined,
    },
  });

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  const fromValue = form.watch("from");
  const toValue = form.watch("to");

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:px-6">
      {/* PAGE HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Oda Ara</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Tarih, şehir ve kişi sayısına göre müsait odaları bulun.
        </p>
      </div>

      {/* SEARCH FORM */}
      <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
        <CardContent >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid gap-6 p-6 md:grid-cols-4">
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel>Şehir</FieldLabel>
                    <Popover
                      open={open}
                      onOpenChange={setOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[200px] justify-between"
                        >
                          {field.value
                            ? countries.flatMap(country => country.cities).find((city) => city.value === field.value)?.label
                            : "Şehir seçiniz..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Şehir ara..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>Şehir bulunamadı</CommandEmpty>
                            {countries.map((country) => (
                              <CommandGroup key={country.name} heading={country.name}>
                                {country.cities.map((city) => (
                                  <CommandItem
                                    key={city.value}
                                    value={city.value}
                                    onSelect={(value) => {
                                      field.onChange(value);
                                      setOpen(false);
                                    }}
                                  >
                                    {city.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        field.value === city.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </Field>

                )}
              >
              </Controller>

              <Controller
                name="from"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel>Giriş Tarihi</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {field.value ? format(field.value, "PPP", {
                            locale: tr
                          }) : <span>Bir tarih seçin</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          locale={tr}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={{
                            before: new Date(),
                            after: toValue ?? undefined,
                          }} />
                      </PopoverContent>
                    </Popover>
                  </Field>
                )}
              >
              </Controller>

              <Controller
                name="to"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel>Çıkış Tarihi</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {field.value ? format(field.value, "PPP", {
                            locale: tr
                          }) : <span>Bir tarih seçin</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          locale={tr}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={{
                            before: fromValue ?? new Date(),
                          }} />
                      </PopoverContent>
                    </Popover>
                  </Field>
                )}
              >
              </Controller>

              <div className="flex items-end">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">
                  Ara
                </Button>
              </div>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* SEARCH RESULTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Sonuçlar</h2>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {hotels.length} sonuç bulundu
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="overflow-hidden bg-white dark:bg-zinc-900"
            >
              <div className="h-40 bg-gradient-to-br from-violet-500/30 to-cyan-500/30" />
              <CardContent className="space-y-3 p-5">
                <div>
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {hotel.city}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    ⭐ {hotel.rating}
                  </span>
                  <span className="text-lg font-semibold text-violet-600">
                    ₺{hotel.price}
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full hover:border-violet-500 hover:text-violet-500"
                >
                  Detayları Gör
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
