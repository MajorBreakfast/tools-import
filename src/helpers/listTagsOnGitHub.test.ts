import { it, expect } from 'vitest'
import listTagsOnGitHub from './listTagsOnGitHub.js'
import { getOctkit } from '../testutils.js'

it('should list the versions to import', async () => {
  expect(await listTagsOnGitHub(getOctkit(), 'golang/go')).toEqual(
    expect.arrayContaining([
      'weekly.2012-03-27',
      'weekly.2012-03-22',
      'weekly.2012-03-13',
      'weekly.2012-03-04',
      'weekly.2012-02-22',
      'weekly.2012-02-14',
      'weekly.2012-02-07',
      'weekly.2012-01-27',
      'weekly.2012-01-20',
      'weekly.2012-01-15',
      'weekly.2011-12-22',
      'weekly.2011-12-14',
      'weekly.2011-12-06',
      'weekly.2011-12-02',
      'weekly.2011-12-01',
      'weekly.2011-11-18',
      'weekly.2011-11-09',
      'weekly.2011-11-08',
      'weekly.2011-11-02',
      'weekly.2011-11-01',
      'weekly.2011-10-26',
      'weekly.2011-10-25',
      'weekly.2011-10-18',
      'weekly.2011-10-06',
      'weekly.2011-09-21',
      'weekly.2011-09-16',
      'weekly.2011-09-07',
      'weekly.2011-09-01',
      'weekly.2011-08-17',
      'weekly.2011-08-10',
      'weekly.2011-07-29',
      'weekly.2011-07-19',
      'weekly.2011-07-07',
      'weekly.2011-06-23',
      'weekly.2011-06-16',
      'weekly.2011-06-09',
      'weekly.2011-06-02',
      'weekly.2011-05-22',
      'weekly.2011-04-27',
      'weekly.2011-04-13',
      'weekly.2011-04-04',
      'weekly.2011-03-28',
      'weekly.2011-03-15',
      'weekly.2011-03-07.1',
      'weekly.2011-03-07',
      'weekly.2011-02-24',
      'weekly.2011-02-15',
      'weekly.2011-02-01.1',
      'weekly.2011-02-01',
      'weekly.2011-01-20',
      'weekly.2011-01-19',
      'weekly.2011-01-12',
      'weekly.2011-01-06',
      'weekly.2010-12-22',
      'weekly.2010-12-15.1',
      'weekly.2010-12-15',
      'weekly.2010-12-08',
      'weekly.2010-12-02',
      'weekly.2010-11-23',
      'weekly.2010-11-10',
      'weekly.2010-11-02',
      'weekly.2010-10-27',
      'weekly.2010-10-20',
      'weekly.2010-10-13.1',
      'weekly.2010-10-13',
      'weekly.2010-09-29',
      'weekly.2010-09-22',
      'weekly.2010-09-15',
      'weekly.2010-09-06',
      'weekly.2010-08-25',
      'weekly.2010-08-11',
      'weekly.2010-08-04',
      'weekly.2010-07-29',
      'weekly.2010-07-14',
      'weekly.2010-07-01',
      'weekly.2010-06-21',
      'weekly.2010-06-09',
      'weekly.2010-05-27',
      'weekly.2010-05-04',
      'weekly.2010-04-27',
      'weekly.2010-04-13',
      'weekly.2010-03-30',
      'weekly.2010-03-22',
      'weekly.2010-03-15',
      'weekly.2010-03-04',
      'weekly.2010-02-23',
      'weekly.2010-02-17',
      'weekly.2010-02-04',
      'weekly.2010-01-27',
      'weekly.2010-01-13',
      'weekly.2010-01-05',
      'weekly.2009-12-22',
      'weekly.2009-12-09',
      'weekly.2009-12-07',
      'weekly.2009-11-17',
      'weekly.2009-11-12',
      'weekly.2009-11-10.1',
      'weekly.2009-11-10',
      'weekly.2009-11-06',
      'weekly',
      'release.r60.3',
      'release.r60.2',
      'release.r60.1',
      'release.r60',
      'release.r59',
      'release.r58.2',
      'release.r58.1',
      'release.r58',
      'release.r57.2',
      'release.r57.1',
      'release.r57',
      'release.r56',
      'go1.24rc1',
      'go1.23.4',
      'go1.23.3',
      'go1.23.2',
      'go1.23.1',
      'go1.23.0',
      'go1.23rc2',
      'go1.23rc1',
      'go1.22.10',
      'go1.22.9',
      'go1.22.8',
      'go1.22.7',
      'go1.22.6',
      'go1.22.5',
      'go1.22.4',
      'go1.22.3',
      'go1.22.2',
      'go1.22.1',
      'go1.22.0',
      'go1.22rc2',
      'go1.22rc1',
      'go1.21.13',
      'go1.21.12',
      'go1.21.11',
      'go1.21.10',
      'go1.21.9',
      'go1.21.8',
      'go1.21.7',
      'go1.21.6',
      'go1.21.5',
      'go1.21.4',
      'go1.21.3',
      'go1.21.2',
      'go1.21.1',
      'go1.21.0',
      'go1.21rc4',
      'go1.21rc3',
      'go1.21rc2',
      'go1.21rc1',
      'go1.20.14',
      'go1.20.13',
      'go1.20.12',
      'go1.20.11',
      'go1.20.10',
      'go1.20.9',
      'go1.20.8',
      'go1.20.7',
      'go1.20.6',
      'go1.20.5',
      'go1.20.4',
      'go1.20.3',
      'go1.20.2',
      'go1.20.1',
      'go1.20',
      'go1.20rc3',
      'go1.20rc2',
      'go1.20rc1',
      'go1.19.13',
      'go1.19.12',
      'go1.19.11',
      'go1.19.10',
      'go1.19.9',
      'go1.19.8',
      'go1.19.7',
      'go1.19.6',
      'go1.19.5',
      'go1.19.4',
      'go1.19.3',
      'go1.19.2',
      'go1.19.1',
      'go1.19',
      'go1.19rc2',
      'go1.19rc1',
      'go1.19beta1',
      'go1.18.10',
      'go1.18.9',
      'go1.18.8',
      'go1.18.7',
      'go1.18.6',
      'go1.18.5',
      'go1.18.4',
      'go1.18.3',
      'go1.18.2',
      'go1.18.1',
      'go1.18',
      'go1.18rc1',
      'go1.18beta2',
      'go1.18beta1',
      'go1.17.13',
      'go1.17.12',
      'go1.17.11',
      'go1.17.10',
      'go1.17.9',
      'go1.17.8',
      'go1.17.7',
      'go1.17.6',
      'go1.17.5',
      'go1.17.4',
      'go1.17.3',
      'go1.17.2',
      'go1.17.1',
      'go1.17',
      'go1.17rc2',
      'go1.17rc1',
      'go1.17beta1',
      'go1.16.15',
      'go1.16.14',
      'go1.16.13',
      'go1.16.12',
      'go1.16.11',
      'go1.16.10',
      'go1.16.9',
      'go1.16.8',
      'go1.16.7',
      'go1.16.6',
      'go1.16.5',
      'go1.16.4',
      'go1.16.3',
      'go1.16.2',
      'go1.16.1',
      'go1.16',
      'go1.16rc1',
      'go1.16beta1',
      'go1.15.15',
      'go1.15.14',
      'go1.15.13',
      'go1.15.12',
      'go1.15.11',
      'go1.15.10',
      'go1.15.9',
      'go1.15.8',
      'go1.15.7',
      'go1.15.6',
      'go1.15.5',
      'go1.15.4',
      'go1.15.3',
      'go1.15.2',
      'go1.15.1',
      'go1.15',
      'go1.15rc2',
      'go1.15rc1',
      'go1.15beta1',
      'go1.14.15',
      'go1.14.14',
      'go1.14.13',
      'go1.14.12',
      'go1.14.11',
      'go1.14.10',
      'go1.14.9',
      'go1.14.8',
      'go1.14.7',
      'go1.14.6',
      'go1.14.5',
      'go1.14.4',
      'go1.14.3',
      'go1.14.2',
      'go1.14.1',
      'go1.14',
      'go1.14rc1',
      'go1.14beta1',
      'go1.13.15',
      'go1.13.14',
      'go1.13.13',
      'go1.13.12',
      'go1.13.11',
      'go1.13.10',
      'go1.13.9',
      'go1.13.8',
      'go1.13.7',
      'go1.13.6',
      'go1.13.5',
      'go1.13.4',
      'go1.13.3',
      'go1.13.2',
      'go1.13.1',
      'go1.13',
      'go1.13rc2',
      'go1.13rc1',
      'go1.13beta1',
      'go1.12.17',
      'go1.12.16',
      'go1.12.15',
      'go1.12.14',
      'go1.12.13',
      'go1.12.12',
      'go1.12.11',
      'go1.12.10',
      'go1.12.9',
      'go1.12.8',
      'go1.12.7',
      'go1.12.6',
      'go1.12.5',
      'go1.12.4',
      'go1.12.3',
      'go1.12.2',
      'go1.12.1',
      'go1.12',
      'go1.12rc1',
      'go1.12beta2',
      'go1.12beta1',
      'go1.11.13',
      'go1.11.12',
      'go1.11.11',
      'go1.11.10',
      'go1.11.9',
      'go1.11.8',
      'go1.11.7',
      'go1.11.6',
      'go1.11.5',
      'go1.11.4',
      'go1.11.3',
      'go1.11.2',
      'go1.11.1',
      'go1.11',
      'go1.11rc2',
      'go1.11rc1',
      'go1.11beta3',
      'go1.11beta2',
      'go1.11beta1',
      'go1.10.8',
      'go1.10.7',
      'go1.10.6',
      'go1.10.5',
      'go1.10.4',
      'go1.10.3',
      'go1.10.2',
      'go1.10.1',
      'go1.10',
      'go1.10rc2',
      'go1.10rc1',
      'go1.10beta2',
      'go1.10beta1',
      'go1.9.7',
      'go1.9.6',
      'go1.9.5',
      'go1.9.4',
      'go1.9.3',
      'go1.9.2',
      'go1.9.1',
      'go1.9',
      'go1.9rc2',
      'go1.9rc1',
      'go1.9beta2',
      'go1.9beta1',
      'go1.8.7',
      'go1.8.6',
      'go1.8.5',
      'go1.8.5rc5',
      'go1.8.5rc4',
      'go1.8.4',
      'go1.8.3',
      'go1.8.2',
      'go1.8.1',
      'go1.8',
      'go1.8rc3',
      'go1.8rc2',
      'go1.8rc1',
      'go1.8beta2',
      'go1.8beta1',
      'go1.7.6',
      'go1.7.5',
      'go1.7.4',
      'go1.7.3',
      'go1.7.2',
      'go1.7.1',
      'go1.7',
      'go1.7rc6',
      'go1.7rc5',
      'go1.7rc4',
      'go1.7rc3',
      'go1.7rc2',
      'go1.7rc1',
      'go1.7beta2',
      'go1.7beta1',
      'go1.6.4',
      'go1.6.3',
      'go1.6.2',
      'go1.6.1',
      'go1.6',
      'go1.6rc2',
      'go1.6rc1',
      'go1.6beta2',
      'go1.6beta1',
      'go1.5.4',
      'go1.5.3',
      'go1.5.2',
      'go1.5.1',
      'go1.5',
      'go1.5rc1',
      'go1.5beta3',
      'go1.5beta2',
      'go1.5beta1',
      'go1.4.3',
      'go1.4.2',
      'go1.4.1',
      'go1.4',
      'go1.4rc2',
      'go1.4rc1',
      'go1.4beta1',
      'go1.3.3',
      'go1.3.2',
      'go1.3.1',
      'go1.3',
      'go1.3rc2',
      'go1.3rc1',
      'go1.3beta2',
      'go1.3beta1',
      'go1.2.2',
      'go1.2.1',
      'go1.2',
      'go1.2rc5',
      'go1.2rc4',
      'go1.2rc3',
      'go1.2rc2',
      'go1.1.2',
      'go1.1.1',
      'go1.1',
      'go1.1rc3',
      'go1.1rc2',
      'go1.0.3',
      'go1.0.2',
      'go1.0.1',
      'go1',
    ])
  )
})
