import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { useState, useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';

import {
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
};

export const ArticleParamsForm = ({ state, setState }: ArticleProps) => {
	const [isOpen, setIsOpen] = useState(true); // TODO: Потом вернуть на false
	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	const changeFontFamily = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};

	const changeFontColor = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	const changeBackgroundColor = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	const changeContentWidth = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	const changeFontSize = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	return (
		<>
			<div ref={asideRef}>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => setIsOpen((prev) => !prev)}
				/>
				<aside
					className={`${styles.container} ${
						isOpen ? styles.container_open : ''
					}`}>
					<form className={styles.form}>
						<Text as={'h2'} size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							selected={state.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={changeFontFamily}
						/>
						<RadioGroup
							name='FontSize'
							options={fontSizeOptions}
							selected={state.fontSizeOption}
							title='Размер шрифта'
							onChange={changeFontSize}
						/>
						<Select
							selected={state.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={changeFontColor}
						/>
						<Separator />
						<Select
							selected={state.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={changeBackgroundColor}
						/>
						<Select
							selected={state.contentWidth}
							options={contentWidthArr}
							title='ширина контента'
							onChange={changeContentWidth}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
