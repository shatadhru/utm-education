"use client";

import dynamic from "next/dynamic";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const PlayerYoutube = dynamic(
  () => import("@/components/Player"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:flex-row">

        {/* ================= Main Classroom ================= */}
        <section className="min-w-0 flex-1">

          {/* Video */}
          <div className="w-full ">
            <PlayerYoutube
              videoUrl="https://youtu.be/pHNYju2l2Ko?list=RDMMpHNYju2l2Ko"
            />
          </div>

          {/* Lesson Info */}
          <div className="w-full px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

              {/* Title */}
              <h1
                className="font-semibold tracking-tight"
                style={{
                  fontSize: "clamp(1.15rem, 2.5vw, 1.75rem)",
                }}
              >
                Introduction to Modern Physics
              </h1>

              {/* Description */}
              <p
                className="mt-2 max-w-3xl leading-6 text-muted-foreground"
                style={{
                  fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                }}
              >
                In this lesson, we will learn the fundamental concepts of
                modern physics and understand how classical physics evolved
                into modern theories.
              </p>

              {/* Tabs */}
              <Tabs
                defaultValue="overview"
                className="mt-6 w-full"
              >
                <TabsList className="grid h-auto w-full grid-cols-2">
                  <TabsTrigger
                    value="overview"
                    className=" text-sm sm:text-base"
                  >
                    Overview
                  </TabsTrigger>

                  <TabsTrigger
                    value="resources"
                    className="py-2.5 text-sm sm:text-base"
                  >
                    Resources
                  </TabsTrigger>
                </TabsList>

                {/* Overview */}
                <TabsContent
                  value="overview"
                  className="mt-5"
                >
                  <div className="space-y-4">

                    <div>
                      <h2
                        className="font-semibold"
                        style={{
                          fontSize: "clamp(1rem, 2vw, 1.25rem)",
                        }}
                      >
                        About this lesson
                      </h2>

                      <p
                        className="mt-2 leading-6 text-muted-foreground"
                        style={{
                          fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                        }}
                      >
                        This lecture introduces the basic ideas that form
                        the foundation of modern physics. Make sure you watch
                        the complete lecture and take notes while learning.
                      </p>
                    </div>

                    <div>
                      <h2
                        className="font-semibold"
                        style={{
                          fontSize: "clamp(1rem, 2vw, 1.25rem)",
                        }}
                      >
                        What you will learn
                      </h2>

                      <ul
                        className="mt-2 list-inside list-disc space-y-1 text-muted-foreground"
                        style={{
                          fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                        }}
                      >
                        <li>Basic concepts of modern physics</li>
                        <li>Important theoretical foundations</li>
                        <li>Real-world applications</li>
                      </ul>
                    </div>

                  </div>
                </TabsContent>

                {/* Resources */}
                <TabsContent
                  value="resources"
                  className="mt-5"
                >
                  <div className="rounded-lg border p-4">
                    <p
                      className="text-muted-foreground"
                      style={{
                        fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                      }}
                    >
                      No resources available for this lesson.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

            </div>
          </div>
        </section>

        {/* ================= Course Sidebar ================= */}
        <aside className="w-full border-t bg-muted/20 lg:w-[360px] lg:border-l lg:border-t-0">

          <div className="sticky top-0">

            <div className="border-b px-4 py-4 sm:px-5">

              <h2
                className="font-semibold"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                }}
              >
                Course Content
              </h2>

              <p
                className="mt-1 text-muted-foreground"
                style={{
                  fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                }}
              >
                12 lessons
              </p>

            </div>

            {/* Lesson Tabs */}
            <Tabs
              defaultValue="lessons"
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-transparent">
                <TabsTrigger
                  value="lessons"
                  className="rounded-none py-3 text-sm"
                >
                  Lessons
                </TabsTrigger>

                <TabsTrigger
                  value="progress"
                  className="rounded-none py-3 text-sm"
                >
                  Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="lessons"
                className="m-0 p-3"
              >
                <div className="space-y-2">

                  <button className="w-full rounded-lg bg-primary/10 p-3 text-left">
                    <p
                      className="font-medium"
                      style={{
                        fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
                      }}
                    >
                      01. Introduction
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      12:45
                    </p>
                  </button>

                  <button className="w-full rounded-lg p-3 text-left transition hover:bg-muted">
                    <p
                      className="font-medium"
                      style={{
                        fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
                      }}
                    >
                      02. Basic Concepts
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      18:20
                    </p>
                  </button>

                  <button className="w-full rounded-lg p-3 text-left transition hover:bg-muted">
                    <p
                      className="font-medium"
                      style={{
                        fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
                      }}
                    >
                      03. Advanced Topics
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      24:10
                    </p>
                  </button>

                </div>
              </TabsContent>

              <TabsContent
                value="progress"
                className="m-0 p-4"
              >
                <div className="rounded-lg border p-4">

                  <p
                    className="font-medium"
                    style={{
                      fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                    }}
                  >
                    Your Progress
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    3 of 12 lessons completed
                  </p>

                </div>
              </TabsContent>

            </Tabs>
          </div>
        </aside>

      </div>
    </main>
  );
}