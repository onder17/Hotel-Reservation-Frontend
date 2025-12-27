import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { tr } from "date-fns/locale";
import { format } from "date-fns";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

export default function Home() {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    defaultValues: {
      city: "",
      from: undefined,
      to: undefined,
    },
  });

  const fromValue = form.watch("from");
  const toValue = form.watch("to");

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/20" />

        <div className="mx-auto max-w-7xl px-4 py-28 md:px-6">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Neon ışıklar altında
              <span className="block text-violet-500">mükemmel konaklama</span>
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Neon Star Hotel ile dünyanın dört bir yanındaki seçkin otelleri
              keşfedin. Güvenli, hızlı ve kolay rezervasyon.
            </p>

            <div className="flex gap-4">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                Otel Ara
              </Button>
              <Button size="lg" variant="outline">
                Kampanyalar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
          <CardContent>
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
      </section>

      {/* FEATURED HOTELS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-semibold">Öne Çıkan Oteller</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Misafirlerimizin en çok tercih ettiği oteller
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="group overflow-hidden bg-white dark:bg-zinc-900"
              >
                <div className="h-48 bg-gradient-to-br from-violet-500/30 to-cyan-500/30" />
                <CardContent className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold">Luxury Neon Hotel</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    İstanbul, Türkiye
                  </p>
                  <Button
                    variant="outline"
                    className="w-full group-hover:border-violet-500 group-hover:text-violet-500"
                  >
                    Detayları Gör
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 p-10 text-white">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-semibold">Hazır mısın?</h2>
            <p className="text-white/80">
              Şimdi rezervasyon yap, neon ayrıcalıklarını yaşamaya başla.
            </p>
            <Button size="lg" variant="secondary">
              Rezervasyon Yap
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
