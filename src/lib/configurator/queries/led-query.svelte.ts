/*
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

import {
  keyboardContext,
  type SetLedParams,
} from "$lib/keyboard"
import type { HMK_Led } from "$lib/libhmk"
import { Context, resource, type ResourceReturn } from "runed"
import { optimisticUpdate } from "."
import { globalStateContext } from "../context.svelte"

export class LedQuery {
  ledConf: ResourceReturn<HMK_Led>

  #keyboard = keyboardContext.get()
  #profile = $derived(globalStateContext.get().profile)

  constructor() {
    this.ledConf = resource(
      () => {},
      () => this.#keyboard.getLedConf(),
    )
  }

  async set(params: SetLedParams) {
    const { data } = params
    await optimisticUpdate({
      resource: this.ledConf,
      optimisticFn: () => data,
      updateFn: () => this.#keyboard.setLedConf(params),
    })
  }
}

export const ledQueryContext = new Context<LedQuery>(
  "hmk-led-query",
)
