import asyncio
import edge_tts

async def list_voices():
    for voice in await edge_tts.list_voices():
        print(voice["ShortName"])

async def generate_audio():
    text = open("Voice.txt", encoding="utf-8").read()
    await edge_tts.Communicate(text, voice="en-US-JennyNeural", rate="-10%", pitch="+0Hz", volume="+50%").save("Voice.mp3")

async def main():
    # await list_voices()
    await generate_audio()

asyncio.run(main())

# python -m pip install edge-tts
# python Voice.py