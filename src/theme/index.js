import {
	NativeBaseProvider,
	extendTheme,
	Icon,
	Image,
	StatusBar,
} from "native-base";

export const customTheme = extendTheme({
	colors: {
		primary: {
			bg: "#171122",
			field: "#231D30",
		},
		secondary: {
			lightGray: "#CCCCCC",
			darkGray: "#7F7F7F",
			white: "#F2F2F2",
			blue: "#386AF5",
			red: "#FF6666",
		},
		supporting: {
			lightGreen: "#31C451",
			darkGreen: "#29A343",
		},
	},
	config: {
		initialColorMode: "dark",
	},
	components: {
		// Button: {
		// 	// Can simply pass default props to change default behaviour of components.
		// 	baseStyle: {
		// 		rounded: "md",
		// 	},
		// 	defaultProps: {
		// 		colorScheme: "red",
		// 	},
		// },
		Heading: {
			// Can pass also function, giving you access theming tools
			baseStyle: ({ colorMode }) => {
				return {
					color: colorMode === "dark" ? "white" : "black",
					// fontWeight: "normal",
				};
			},
		},
        Text: {
            baseStyle: ({ colorMode }) => {
                return {
                    color: colorMode === "dark" ? "white" : "black",
                };
            }
        },
	},
	// fontConfig: {
	//     sfPro: {
	//         100: {
	//             normal: 'sfProFont',
	//         },
	//         200: {
	//             normal: 'sfProFont',
	//         },
	//         300: {
	//             normal: 'sfProFont',
	//         },
	//         400: {
	//             normal: 'sfProFont',
	//         },
	//         500: {
	//             normal: 'sfProFont',
	//         },
	//         600: {
	//             normal: 'sfProFont',
	//         },
	//         700: {
	//             normal: 'sfProFont',
	//         },
	//         800: {
	//             normal: 'sfProFont',
	//         },

	//     }
	// },
	// fonts: {
	//     heading: "sfPro",
	//     body: "sfPro",
	//     mono: "sfPro",
	// },
});

export const navigatorTheme = {
	colors: {
		primary: {
			bg: "#171122",
			field: "#231D30",
		},
		secondary: {
			lightGray: "#CCCCCC",
			darkGray: "#7F7F7F",
			white: "#F2F2F2",
			blue: "#386AF5",
			red: "#FF6666",
		},
		supporting: {
			lightGreen: "#31C451",
			darkGreen: "#29A343",
		},
	},
}
