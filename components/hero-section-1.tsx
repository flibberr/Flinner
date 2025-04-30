"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image' // Import Image
import { ArrowRight, ChevronRight, Menu, X, Github, Linkedin, Twitter } from 'lucide-react' // Added social icons
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { ThemeToggle } from '@/components/ui/theme-toggle' // Import ThemeToggle
import { SparklesCore } from "@/components/ui/sparkles"; // Import SparklesCore
import { Magnetic } from "@/components/ui/magnetic"; // Import Magnetic
import { RainbowButton } from "@/components/ui/rainbow-button"; // Corrected import for RainbowButton
import { StarBorder } from "@/components/ui/star-border"; // Corrected import for StarBorder
import { ButtonColorful } from "@/components/ui/button-colorful"; // Import ButtonColorful
import { cn } from '@/lib/utils'

// Removed HeroHeader component and menuItems from this file

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    // Removed <HeroHeader /> call
    return (
        <>
            {/* Header is now handled by layout.tsx */}
            <main className="overflow-hidden pt-16 md:pt-20"> {/* Added padding-top to account for fixed header height */}
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                                alt="background"
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        href="#link"
                                        className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                        <span className="text-foreground text-sm">Analyst-Ready Reports in One Click</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* Container for H1, P, and Sparkles */}
                                    <div className="w-full relative flex flex-col items-center justify-center overflow-hidden rounded-md mt-8 lg:mt-16 pt-10"> {/* Removed bottom padding */}
                                        {/* Sparkles Background Layer */}
                                        <div className="absolute inset-0 w-full h-full">
                                            <SparklesCore
                                                id="tsparticlesfullpage"
                                                background="transparent"
                                                minSize={0.6}
                                                maxSize={1.4}
                                                particleDensity={100}
                                                className="w-full h-full"
                                                particleColor="#FFFFFF"
                                            />
                                        </div>
                                        {/* Text Content Layer */}
                                        <div className="relative z-10 text-center">
                                            <h1 className="text-balance text-6xl md:text-7xl xl:text-[5.25rem]">
                                                Investment Intelligence, Reimagined
                                            </h1>
                                            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg"> {/* Reverted paragraph top margin */}
                                                Real-time dashboards, analyst-grade valuation tools, and data-driven<br />insights — all in one modern platform.
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-10 flex flex-col items-center justify-center gap-2 md:flex-row"> {/* Reverted button group top margin */}
                                    {/* Replaced StarBorder with ButtonColorful */}
                                    <ButtonColorful key={1}>
                                        Explore Components
                                    </ButtonColorful>
                                    {/* Removed Request a demo button */}
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <img
                                        className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                                        src="https://tailark.com//_next/image?url=%2Fmail2.png&w=3840&q=75"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                    <img
                                        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                                        src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                {/* Replaced Customers Section with Social Links Section */}
                <section className="bg-background py-16 md:py-24">
                    <div className="container mx-auto px-6">
                        <h2 className="text-center text-2xl font-semibold mb-8">Connect With Us</h2>
                        <div className="flex justify-center items-center gap-8">
                            <Magnetic>
                                <Link href="https://github.com/flibberr" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="p-2 px-4 rounded-full hover:bg-muted transition-colors"> {/* Added px-4 */}
                                    <Github className="h-8 w-8" />
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="https://www.linkedin.com/in/harsh-bhardwaj-flib" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="p-2 px-4 rounded-full hover:bg-muted transition-colors"> {/* Added px-4 */}
                                    <Linkedin className="h-8 w-8" />
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="https://www.reddit.com/user/flibbergibbett/" aria-label="Reddit" target="_blank" rel="noopener noreferrer" className="p-2 px-4 rounded-full hover:bg-muted transition-colors text-sm font-medium"> {/* Added px-4 */}
                                    Reddit
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="mailto:Harshbhardwaj873@gmail.com" aria-label="Gmail" className="p-2 px-4 rounded-full hover:bg-muted transition-colors text-sm font-medium"> {/* Added px-4 */}
                                    Gmail
                                </Link>
                            </Magnetic>
                            {/* Add more social links as needed */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

// Removed HeroHeader component definition and menuItems constant
