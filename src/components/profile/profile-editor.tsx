"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "convex/react";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { z } from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const profileSchema = z.object({
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  avatarUrl: z.union([
    z.string().url({ message: "Must be a valid URL" }),
    z.literal(""),
  ]),
  linkedin: z.union([
    z.string().url({ message: "Must be a valid URL" }),
    z.literal(""),
  ]),
  x: z.union([
    z.string().url({ message: "Must be a valid URL" }),
    z.literal(""),
  ]),
  contact: z.string(),
});

type ProfileDoc = {
  _id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  links: { linkedin?: string; x?: string };
  contact?: string;
};

function ProfileFormInner({ profile }: { profile: ProfileDoc }) {
  const upsert = useMutation(api.profiles.upsertMine);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      slug: profile.slug,
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl ?? "",
      linkedin: profile.links.linkedin ?? "",
      x: profile.links.x ?? "",
      contact: profile.contact ?? "",
    },
    validators: { onSubmit: profileSchema },
    onSubmit: async ({ value }) => {
      await upsert({
        slug: value.slug,
        name: value.name,
        title: value.title,
        bio: value.bio,
        avatarUrl: value.avatarUrl || undefined,
        links: {
          linkedin: value.linkedin || undefined,
          x: value.x || undefined,
        },
        contact: value.contact || undefined,
      });
      navigate({ to: "/me" });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>My profile</CardTitle>
        <CardDescription>
          Your profile is visible to other community members. Contact info is
          only shown to signed-in users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <FieldGroup>
            <form.Field
              name="slug"
              validators={{ onSubmit: profileSchema.shape.slug }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Profile URL slug</FieldLabel>
                    <FieldDescription>
                      Used in your profile URL: /community/your-slug
                    </FieldDescription>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="jane-doe"
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="name"
              validators={{ onSubmit: profileSchema.shape.name }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Jane Doe"
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="title"
              validators={{ onSubmit: profileSchema.shape.title }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Senior Developer"
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="bio"
              validators={{ onSubmit: profileSchema.shape.bio }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                    <MarkdownEditor
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
                      placeholder="Tell us about yourself…"
                      rows={5}
                      writeLabel="Write"
                      previewLabel="Preview"
                      emptyPreviewText="Nothing to preview"
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="avatarUrl"
              validators={{ onSubmit: profileSchema.shape.avatarUrl }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Avatar URL</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="https://…"
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="linkedin"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>LinkedIn</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://linkedin.com/in/…"
                  />
                </Field>
              )}
            />
            <form.Field
              name="x"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>X (Twitter)</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://x.com/…"
                  />
                </Field>
              )}
            />
            <form.Field
              name="contact"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Contact (members-only)
                  </FieldLabel>
                  <FieldDescription>
                    Phone or email – only visible to signed-in members
                  </FieldDescription>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="+503 1234 5678"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex gap-2">
            <Button type="submit" disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? "Saving…" : "Save profile"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate({ to: "/me" })
              }
            >
              View profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProfileEditor() {
  const profile = useQuery(api.profiles.me);

  if (profile === undefined) {
    return (
      <Card>
        <CardContent className="pt-6">Loading…</CardContent>
      </Card>
    );
  }

  const defaultProfile: ProfileDoc = profile ?? {
    _id: "",
    slug: "",
    name: "",
    title: "",
    bio: "",
    links: {},
  };

  return (
    <ProfileFormInner profile={defaultProfile} key={profile?._id ?? "new"} />
  );
}
