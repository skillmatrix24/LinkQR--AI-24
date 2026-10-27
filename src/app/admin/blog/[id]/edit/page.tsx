
"use client";

import { useParams } from "next/navigation";
import BlogEditorForm from "../../editor-form";

export default function EditBlogPost() {
  const params = useParams();
  const id = params.id as string;

  return <BlogEditorForm id={id} />;
}
