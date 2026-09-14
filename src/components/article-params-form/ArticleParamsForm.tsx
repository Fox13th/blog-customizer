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
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleProps = {
	applyBut: (state: typeof defaultArticleState) => void;
	resetBut: () => void;
};

export const ArticleParamsForm = ({ applyBut, resetBut }: ArticleProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [asideState, setAsideState] = useState(defaultArticleState);

	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

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
	}, [isOpen]);

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setAsideState((prev) => ({ ...prev, [field]: value }));
		};
	};

	const resetAsideState = () => {
		setAsideState(defaultArticleState);
		resetBut();
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
							selected={asideState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={updateFormField('fontFamilyOption')}
						/>
						<RadioGroup
							name='FontSize'
							options={fontSizeOptions}
							selected={asideState.fontSizeOption}
							title='Размер шрифта'
							onChange={updateFormField('fontSizeOption')}
						/>
						<Select
							selected={asideState.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={updateFormField('fontColor')}
						/>
						<Separator />
						<Select
							selected={asideState.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={updateFormField('backgroundColor')}
						/>
						<Select
							selected={asideState.contentWidth}
							options={contentWidthArr}
							title='ширина контента'
							onChange={updateFormField('contentWidth')}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='button'
								type='clear'
								onClick={resetAsideState}
							/>
							<Button
								title='Применить'
								htmlType='button'
								type='apply'
								onClick={() => applyBut(asideState)}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
