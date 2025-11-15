<!-- 
This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details.

You should have received a copy of the GNU General Public License along with
this program. If not, see <https://www.gnu.org/licenses/>.
-->

<script lang="ts">
  import { EllipsisVerticalIcon } from "@lucide/svelte"
  import FixedScrollArea from "$lib/components/fixed-scroll-area.svelte"
  import { Badge } from "$lib/components/ui/badge"
  import { Button } from "$lib/components/ui/button"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { keyboardContext } from "$lib/keyboard"
  import { cn, type WithoutChildren } from "$lib/utils"
  import { toast } from "svelte-sonner"
  import type { HTMLAttributes } from "svelte/elements"
  import z from "zod"
  import { KeyboardConfig } from "../lib/keyboard-config.svelte"
  import { profileQueryContext } from "../queries/profile-query.svelte"

  import { ledQueryContext } from "../queries/led-query.svelte"
    import { Input } from "$lib/components/ui/input"

  // Use the query instance directly (same pattern as other menus).
  const ledQuery = ledQueryContext.get()

  const {
    class: className,
    ...props
  }: WithoutChildren<HTMLAttributes<HTMLDivElement>> = $props()

  const { name, numProfiles } = keyboardContext.get().metadata

  const profileQuery = profileQueryContext.get()
  const { current: currentProfile } = $derived(profileQuery.profile)
  const keyboardConfig = new KeyboardConfig()

  let fileRef: HTMLInputElement | null = $state(null)
  let anchorRef: HTMLAnchorElement | null = $state(null)
  let colorPickerRef: HTMLInputElement | null = $state(null)


  const handleColorChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    const hex = input.value
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    ledQuery.set({
      data: { ledRed: r, ledGreen: g, ledBlue: b },
    })
  }

</script>

<div
  class={cn("mx-auto flex size-full max-w-3xl flex-col", className)}
  {...props}
>
  <FixedScrollArea class="flex flex-col gap-4 p-4">
    <div class="grid shrink-0">
      <span class="font-semibold">Configure Lighting</span>
      <span class="text-sm text-muted-foreground">
        Change the backlight colour here.
      </span>
    </div>

    <div>
      <input
        bind:this={colorPickerRef}
        type="color"
        onchange={handleColorChange}
        value="#ff0000"
      />
    </div>
    
  </FixedScrollArea>
</div>

<input
  bind:this={fileRef}
  accept="application/json"
  aria-hidden="true"
  hidden
  type="file"
/>
<a bind:this={anchorRef} aria-hidden="true" hidden href="#0"></a>
