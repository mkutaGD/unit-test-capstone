

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
       
        expect(unitTestingTask('DD-MM-YYYY', new Date('2023-02-15'))).toBe('śr-02-2023')
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

