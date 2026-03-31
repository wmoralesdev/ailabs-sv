"use client";

import { DesignSystemHero } from "./design-system-hero";
import { ComponentPreview } from "./component-preview";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisplayChip, ToggleChip } from "@/components/ui/toggle-chip";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { AnimatedGrid } from "@/components/ui/animated-grid";

export function DesignSystemPage() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
        <main className="pt-24">
          <DesignSystemHero />

          <div id="components" className="container mx-auto px-6 pb-20 scroll-mt-24">
            <Tabs defaultValue="buttons" className="w-full">
              <TabsList className="mb-8 flex w-full flex-wrap gap-1 bg-muted/50 p-1">
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="forms">Form Fields</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="chips">Chips & Misc</TabsTrigger>
              </TabsList>

              <TabsContent value="buttons" className="space-y-6">
                <ComponentPreview
                  title="Button"
                  description="All buttons use rounded-md. Variants include outlinePrimary, destructiveOutline, signInBar (header CTA). Sizes: xs, sm, default, lg, xl, 2xl, 3xl, icon*, default size lg."
                  usage='import { Button } from "@/components/ui/button";'
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="outlinePrimary">Outline primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="destructiveOutline">
                        Destructive outline
                      </Button>
                      <Button variant="link">Link</Button>
                      <Button variant="signInBar">Sign-in bar</Button>
                      <Button variant="signInBarInverted">Sign-in inverted</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="xs">xs</Button>
                      <Button size="sm">sm</Button>
                      <Button size="default">default</Button>
                      <Button size="lg">lg</Button>
                      <Button size="xl">xl</Button>
                      <Button size="2xl">2xl</Button>
                      <Button size="3xl">3xl</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button loading>Loading</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </div>
                </ComponentPreview>
              </TabsContent>

              <TabsContent value="forms" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <ComponentPreview
                    title="Input"
                    usage='import { Input } from "@/components/ui/input";'
                  >
                    <div className="flex flex-col gap-2">
                      <Input placeholder="Placeholder text" />
                      <Input placeholder="Disabled" disabled />
                    </div>
                  </ComponentPreview>

                  <ComponentPreview
                    title="Textarea"
                    usage='import { Textarea } from "@/components/ui/textarea";'
                  >
                    <Textarea placeholder="Enter text..." />
                  </ComponentPreview>

                  <ComponentPreview
                    title="Select"
                    usage='import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";'
                  >
                    <Select value="a">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Option A</SelectItem>
                        <SelectItem value="b">Option B</SelectItem>
                        <SelectItem value="c">Option C</SelectItem>
                      </SelectContent>
                    </Select>
                  </ComponentPreview>

                  <ComponentPreview
                    title="Label"
                    usage='import { Label } from "@/components/ui/label";'
                  >
                    <Label htmlFor="ds-label">Label text</Label>
                    <Input id="ds-label" className="mt-1" placeholder="Input" />
                  </ComponentPreview>
                </div>

                <ComponentPreview
                  title="Field"
                  usage='import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from "@/components/ui/field";'
                >
                  <FieldGroup>
                    <Field>
                      <FieldLabel required>Label</FieldLabel>
                      <FieldDescription>Helper text.</FieldDescription>
                      <Input placeholder="Value" />
                      <FieldError errors={[{ message: "Sample error" }]} />
                    </Field>
                  </FieldGroup>
                </ComponentPreview>
              </TabsContent>

              <TabsContent value="cards" className="space-y-6">
                <ComponentPreview
                  title="Card"
                  usage='import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";'
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card description text.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Card content goes here.</p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                </ComponentPreview>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                <ComponentPreview
                  title="SectionHeader"
                  description="Eyebrow + title + optional description"
                  usage='import { SectionHeader } from "@/components/section-header";'
                >
                  <SectionHeader
                    eyebrow="SECTION"
                    title="Section Title"
                    description="Optional description text."
                    align="left"
                  />
                </ComponentPreview>

                <ComponentPreview
                  title="Badge"
                  description="Variants: default, secondary, destructive, outline"
                  usage='import { Badge } from "@/components/ui/badge";'
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </ComponentPreview>

                <ComponentPreview
                  title="Separator"
                  usage='import { Separator } from "@/components/ui/separator";'
                >
                  <div className="space-y-2">
                    <div className="text-sm">Above</div>
                    <Separator />
                    <div className="text-sm">Below</div>
                  </div>
                </ComponentPreview>

                <ComponentPreview
                  title="Marquee"
                  description="CSS pattern. Use animate-marquee on a flex container. Duplicate items for seamless loop. Keyframes in src/styles.css."
                  usage='className="flex gap-4 whitespace-nowrap animate-marquee hover:paused"'
                >
                  <div className="overflow-hidden py-2">
                    <div className="flex gap-4 whitespace-nowrap px-6 motion-reduce:overflow-x-auto motion-reduce:animate-none animate-marquee hover:paused">
                      {[...Array(8), ...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-xs"
                        >
                          Item {(i % 8) + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </ComponentPreview>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <ComponentPreview
                  title="Alert"
                  usage='import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";'
                >
                  <div className="space-y-4">
                    <Alert>
                      <AlertTitle>Default</AlertTitle>
                      <AlertDescription>Default alert message.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <AlertTitle>Destructive</AlertTitle>
                      <AlertDescription>Error or warning message.</AlertDescription>
                    </Alert>
                  </div>
                </ComponentPreview>

                <ComponentPreview
                  title="Spinner"
                  usage='import { Spinner } from "@/components/ui/spinner";'
                >
                  <div className="flex gap-4">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                </ComponentPreview>
              </TabsContent>

              <TabsContent value="chips" className="space-y-6">
                <ComponentPreview
                  title="ToggleChip / DisplayChip"
                  usage='import { ToggleChip, DisplayChip } from "@/components/ui/toggle-chip";'
                >
                  <div className="flex flex-wrap gap-2">
                    <ToggleChip
                      label="Selectable"
                      selected={false}
                      onToggle={() => {}}
                    />
                    <ToggleChip
                      label="Selected"
                      selected={true}
                      onToggle={() => {}}
                    />
                    <DisplayChip label="Display only" />
                  </div>
                </ComponentPreview>

                <ComponentPreview
                  title="AnimatedGrid"
                  usage='import { AnimatedGrid } from "@/components/ui/animated-grid";'
                >
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    <AnimatedGrid />
                  </div>
                </ComponentPreview>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
