import React, { useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`
const Btn = styled.button`
	padding: 1.5rem 3rem;
	cursor: pointer;
`

const Canvas = styled.canvas`
	background-color: #fff;
`

const Main = () => {
	const canvasRef = useRef(null)
	return (
		<Container>
			<Canvas ref={canvasRef} width="512" height="256" />
			<Btn
				onClick={() => {
					clickHandler(canvasRef.current)
				}}
			>
				generate
			</Btn>
		</Container>
	)
}

export default Main

const clickHandler = (canvas) => {
	axios
		.post('/sdapi/v1/txt2img', payload)
		.then(function (response) {
			const image = new Image()
			image.src = `data:image/png;base64,${response.data.images[0]}`

			image.onload = function () {
				draw(canvas, image)
			}
			console.log('done')
		})
		.catch(function (error) {
			console.log(error)
		})
}

const payload = {
	enable_hr: false,
	denoising_strength: 0,
	firstphase_width: 0,
	firstphase_height: 0,
	prompt:
		'Environment concept art, cinematic shot, brush hard, artstation, for aaa game, high quality, brush stroke',
	styles: [],
	seed: -1,
	subseed: -1,
	subseed_strength: 0,
	seed_resize_from_h: -1,
	seed_resize_from_w: -1,
	batch_size: 1,
	n_iter: 1,
	steps: 30,
	cfg_scale: 7,
	width: 512,
	height: 256,
	restore_faces: false,
	tiling: false,
	negative_prompt: 'string',
	eta: 0,
	s_churn: 0,
	s_tmax: 0,
	s_tmin: 0,
	s_noise: 1,
	override_settings: {},
	sampler_index: 'Euler a',
}

const draw = (canvas, img) => {
	const ctx = canvas.getContext('2d')

	ctx.clearRect(0, 0, 512, 512)

	ctx.drawImage(img, 0, 0)
}
