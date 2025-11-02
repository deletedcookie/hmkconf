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

import { DataViewReader } from "$lib/data-view-reader"
import { uint16ToUInt8s } from "$lib/integer"
import type { SetLedParams } from "$lib/keyboard"
import type { Commander } from "$lib/keyboard/commander"
import { HMK_Command } from "."
import type { HMK_Led } from ".."


export async function getLedConf(
  commander: Commander,
): Promise<HMK_Led> {
  const reader = new DataViewReader(
    await commander.sendCommand({ command: HMK_Command.GET_LED_CONF }),
  )

  return {
    ledBrightness: reader.uint8(),
    ledRed: reader.uint8(),
    ledGreen: reader.uint8(),
    ledBlue: reader.uint8(),
  }
}

export async function setLedConf(
  commander: Commander,
  {
    data: { ledBrightness, ledRed, ledGreen, ledBlue },
  }: SetLedParams,
) {
  await commander.sendCommand({
    command: HMK_Command.SET_LED_CONF,
    payload: [
      ...uint16ToUInt8s(ledBrightness),
      ...uint16ToUInt8s(ledRed),
      ...uint16ToUInt8s(ledGreen),
      ...uint16ToUInt8s(ledBlue),
    ],
  })
}
