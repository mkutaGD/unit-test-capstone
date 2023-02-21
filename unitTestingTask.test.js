

const unitTestingTask = require("./unitTestingTask");

console.log(unitTestingTask)

describe('Main function', () => {
    test('throws exception if `format` argument is not a string', () => {
        const f = () => { unitTestingTask(99, new Date()) }
        expect(f).toThrow('Argument `format` must be a string');
    })
    
    test('throws exception if `date` argument is not a date', () => {
        const f = () => { unitTestingTask('MM', true) }
        expect(f).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
    })

    test('unitTestingTask with format which already exists', () => {
        expect(unitTestingTask('ISODate', new Date('2023-2-13'))).toBe('2023-02-13')
    })

    test('unitTestingTask with format which not exist', () => {
        unitTestingTask.lang('pl', undefined);

        expect(unitTestingTask('DD-MM-YYYY', new Date('2023-02-15'))).toBe('śr-02-2023');
        expect(unitTestingTask('DDD-MMMM-YY', new Date('2023-02-15'))).toBe('środa-luty-23')
        expect(unitTestingTask('DDD-MMM-YY', new Date('2023-02-15'))).toBe('środa-lut-23')
        expect(unitTestingTask('D-M-YY', new Date('2023-02-15'))).toBe('Śr-2-23')
        expect(unitTestingTask('dd-M-YY', new Date('2023-02-15'))).toBe('15-2-23')
        expect(unitTestingTask('d-M-YY', new Date('2023-02-15'))).toBe('15-2-23')
        expect(unitTestingTask('d-M-YY HH:mm:ss', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 15:34:34')
        expect(unitTestingTask('d-M-YY HH:mm:ss:ff', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 15:34:34:000')
        expect(unitTestingTask('d-M-YY HH:mm:ss:f', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 15:34:34:0')
        expect(unitTestingTask('d-M-YY H:m:s', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 15:34:34')
        expect(unitTestingTask('d-M-YY hh:mm:ss', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 03:34:34')
        expect(unitTestingTask('d-M-YY h:m:s', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 3:34:34')

        unitTestingTask.lang('en');

        expect(unitTestingTask('d-M-YY HH:mm:ss A', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 15:34:34 PM')
        expect(unitTestingTask('d-M-YY HH:mm:ss a', new Date('2023-02-15 15:34:34'))).toBe('15-2-23 15:34:34 pm')

    })

    test('noConflict function', () => {
        expect(unitTestingTask.noConflict()).toBe(unitTestingTask);
    })
})

describe('Lang Function', () => {
    
    test('formats by default in English if language is not set', () => {
        unitTestingTask.lang()
        expect(unitTestingTask._languages.en._months[0]).toBe('January')
    }) 
    
    test('change language with no options', () => {
        unitTestingTask.lang('pl', undefined);
        expect(unitTestingTask._languages.current).toBe('pl')
    })

    test('change language with no options and no file in lang folder', () => {
        unitTestingTask.lang('ja', undefined);
        expect(unitTestingTask._languages.current).toBe('pl')
    })
    
    test('change language with options', () => {
        const options = {
            months: ['styczeń', 'luty']
        }
    
        unitTestingTask.lang('pl', options);
    
        expect(unitTestingTask._languages.pl.months[0]).toBe('styczeń');
    })
});

describe('Languages functions', () => {
    test('months function', () => {
        expect(unitTestingTask._languages.en.months(new Date('2/20/2023'))).toBe('February')
    })

    test('monthsShort function', () => {
        expect(unitTestingTask._languages.en.monthsShort(new Date('2/20/2023'))).toBe('Feb')
    })

    test('meridiem function should return `am`', () => {
        expect(unitTestingTask._languages.en.meridiem(11, true)).toBe('am')
    })

    test('meridiem function should return `PM`', () => {
        expect(unitTestingTask._languages.en.meridiem(12, false)).toBe('PM')
    })
})

describe('Register function', () => {
    test('register date format', () => {
        expect(unitTestingTask.register('ISODateTime', 'YYYY-MM-dd hh:mm:ss')(new Date('2023-2-13'))).toBe('2023-02-13 12:00:00')
    })
})

