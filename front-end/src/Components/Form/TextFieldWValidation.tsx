import { TextField } from "@kobalte/core";
import { Accessor, JSXElement, Setter, Show } from "solid-js";
import textFieldStyles from "./TextField.module.css";

interface ITextFieldProps {
	fieldName: string;
	placeholder?: string;
	description?: JSXElement;
	pattern?: string;
	type?: string;
	value: Accessor<string>;
	setValue: Setter<string>;
	validate?(value: string): boolean;
}

export default function (props: ITextFieldProps) {
	return (
		<TextField.Root
			class={textFieldStyles.field_root}
			value={props.value()}
			onChange={props.setValue}
			validationState={
				props.validate && (props.validate(props.value()) ? "valid" : "invalid")
			}
		>
			<TextField.Label class={textFieldStyles.input_label}>
				{props.fieldName}
			</TextField.Label>
			<TextField.Input
				type={props.type || "text"}
				pattern={props.pattern}
				class={textFieldStyles.field_input}
				placeholder={props.placeholder}
			/>
			<TextField.ErrorMessage as="small" class={textFieldStyles.field_error}>
				Please Enter Valid {props.fieldName}
			</TextField.ErrorMessage>
			<Show when={Boolean(props.description)}>
				<TextField.Description as="small" class={textFieldStyles.field_desc}>
					{props.description}
				</TextField.Description>
			</Show>
		</TextField.Root>
	);
}
